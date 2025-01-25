import { Injectable, inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonUtils } from '@utils';
import { InMemoryApiController,InMemApiJobFactoryService }from '../types';
import { AuthUser,AuthToken,AuthUserScopes } from '../models';

@Injectable({providedIn:"root"})
export class AuthController extends InMemoryApiController<AuthUser,"users"> {
  jobQ = inject(InMemApiJobFactoryService);
  constructor(){
    super();
    this.model = "users";
    this.ctr = AuthUser;
    this.withStatus = true;
  }
  getAdminScope = (m:AuthUser) => m.scopes.includes("SUPR")?"SUPR":m.scopes.includes("ADMN")?"ADMN":null;
  generateTkn(m:AuthUser,type:"auth"|"req",role?:AuthUserScopes){
    const issued = new Date();
    const expiresIn = 1000 * 60 * 60 * 48;
    const expires = new Date(issued.getTime() + expiresIn);
    const token:AuthToken = {
      type,
      issued,
      expires,
      expiresStr:expires.toLocaleString(),
      user:m.username || m.email,
      role:role || m.token?.role ||"GUEST",
      _id:CommonUtils.longId(),
    };
    return token;
  };
  validateTknAndFindUser = (req:HttpRequest<any>) => {
    if(!this.isLoggedIn(req.headers)) throw "forbidden";
    const tokenStr = req.headers.get("authorization")||"";
    const tokenParts = tokenStr.split(" ");
    const tokenValid = tokenParts[0] == "Bearer" && typeof tokenParts[1] === "string";
    if(!tokenValid) throw "forbidden";
    const token = tokenParts[1];
    const {m,i} = this._findone({"token._id":token});
    if(!m) throw "userNotFound";
    if(!m.token) throw "unauthorized";
    const expired = m.token?new Date(m.token.expires).getTime() <= new Date().getTime():null;
    if(expired) throw "jwtExpired";
    return {m,i};
  };
  
  signin = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m,i} = this._findone(data);
      if(!m) throw "userNotFound";
      m.token = this.generateTkn(m,"req");
      this._save(m,i);
      return this.ok(m.jsonAuth());
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  signinAdmin = (req:HttpRequest<any>) => {
    try {
      //if (!isLoggedIn(headers)) return e["unauthorized"]();
      const {body:{data}} = req;
      const {m,i} = this._findone(data);
      if(!m) throw "userNotFound";
      const role = this.getAdminScope(m);
      if(!role) throw "unauthorized";//forbidden
      m.token = this.generateTkn(m,"req",role);
      this._save(m,i);
      return this.ok(m.jsonAuth());
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  override lookup = (req:HttpRequest<any>) => {
    const {body:{data}} = req;
    const {m} = this._findone(data,true);
    //console.log(data,m);
    return this.ok({exists:!!m});
  };
  signup = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m} = this._findone(data);
      if(m) throw "existingUser";
      const verification = CommonUtils.generateSixDigitCode();
      const n = this._new({...data,verification,createdOn:new Date(),updatedAt:new Date()});
      n.token = this.generateTkn(n,"req");
      n.meta = {created:new Date()};
      const job = this.jobQ.addJob("notification",{
        type:"verification",
        data:{code:n.verification},
      });
      job?n.verificationSent = new Date():null;
      this._add(n);
      return this.ok(n.jsonAuth());
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  verify = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m,i} = this._findone({email:data.email});
      if(!m) throw "userNotFound";
      if(m.verification !== data.verification) throw "invalidCode";
      m.status = {name:"enabled",time:new Date()};
      m.verification = null;
      m.token = this.generateTkn(m,"req");
      m.meta = {...m.meta,verified:new Date()};
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  register = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m} = this._findone({email:data.email});
      if(m) throw "existingUser";
      const now = new Date();
      const verification = CommonUtils.generateSixDigitCode();
      const job = this.jobQ.addJob("notification",{
        type:"verification",
        data:{code:verification},
      });
      const n = this._new({
        ...data,
        ...data.agree?{agree:now}:null,
        ...job?{verificationSent:now}:null,
        verification,
        createdOn:now,
        updatedOn:now,
        meta:{created:now,registered:now},
      });
      n.token = this.generateTkn(n,"auth");
      this._add(n);
      return this.ok(n.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  setPin = (req:HttpRequest<any>) => {
    try {
      //if (!isLoggedIn(headers)) return e["unauthorized"]();
      const {body:{data}} = req;
      const {m,i} = this._findone({username:data.username});
      if(!m) throw "userNotFound";
      m.pin = data.pin;
      m.updatedOn = new Date();
      m.status = {name:"active",time:new Date()};
      m.meta = {...m.meta,reset:new Date()};
      m.token = this.generateTkn(m,"auth");
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  login = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m,i} = this._findone({
        //email:data.emailOrUsername,
        username:data.emailOrUsername
      },true);
      if(!m) throw "userNotFound";
      if(m.pin !== data.pin) throw "invalidAuth";
      m.status = {name:"active",time:new Date()};
      m.updatedOn = new Date();
      m.token = this.generateTkn(m,"auth");
      m.meta = {...m.meta,loggedin:new Date()};
      const j = this.jobQ.addJob("notification",{type:"new-login",data:{userName:m.email,userDevice:'12345a'}});
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  autologin = (req:HttpRequest<any>) => {
    try {
      const {m,i} = this.validateTknAndFindUser(req);
      m.status = {name:"active",time:new Date()};
      m.updatedOn = new Date();
      m.token = this.generateTkn(m,"auth");
      m.meta = {...m.meta,loggedin:new Date()};
      //const j = this.jobQ.addJob("notification",{type:"new-login",data:{userName:m.email,userDevice:'12345a'}});
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  }
  resetPin = (req:HttpRequest<any>) => {
    try {
      //if (!isLoggedIn(headers)) return e["unauthorized"]();
      const {body:{data}} = req;
      const {m,i} = this._findone({email:data.email});
      if(!m) throw "userNotFound";
      if(m.reset !== data.resetTkn) throw "unauthorized";
      m.reset = null;
      m.pin = data.pin;
      m.updatedOn = new Date();
      m.status = {name:"active",time:new Date()};
      m.meta = {...m.meta,reset:new Date()};
      m.token = this.generateTkn(m,"auth",m.token?.role||"GUEST");
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  override update = (req:HttpRequest<any>) => {
    try {
      const {body:{data}} = req;
      const {m,i} = this._findone({username:data.username});
      if(!m) throw "userNotFound";
      const now = new Date();
      Object.assign(m,data.updates);
      m.updatedOn = now;
      m.token = this.generateTkn(m,"auth");
      m.status = {name:"active",time:now};
      m.meta = {...m.meta,updated:now};
      this._save(m,i);
      return this.ok(m.jsonAuth(true));
    }
    catch(e:any){
      if(typeof e == "string") return this.e[e]();
      return this.e["someerror"](e);
    }
  };
  logout = (req:HttpRequest<any>) => {
    const {body:{data}} = req;
    const {m,i} = this._findone({username:data.username});
    if(!m) return this.e["userNotFound"]();
    //m.meta = {...m.meta,loggedout:new Date()};
    //m.token_ = null;
    this._save(m,i);
    return this.ok();
  };
}
/*
  forgotName:() => {
    const acctDetails = body as AuthCreds;
    //let {m} = _findone(auth,{username:username);
    //if(!m) return e["userNotFound"]();
    return ok();//new AuthAcct(m).json());
  },
  forgotPin:() => {
    const {email} = body as AuthCreds;
    let {m} = _findone(auth,"email",email);
    if(!m) return e["userNotFound"]();
    return ok();//new AuthAcct(m).json());
  },
*/