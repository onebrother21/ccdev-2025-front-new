import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { AuthController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class AuthRouter extends InMemApiHandlersService {
  constructor(private auth:AuthController){super();}
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.match('/lookup') && method === 'POST':return this.auth.lookup(req);
        case url.match('/signin') && method === 'POST':return this.auth.signin(req);
        case url.match('/signin-admin') && method === 'POST':return this.auth.signinAdmin(req);
        case url.match('/signup') && method === 'POST':return this.auth.signup(req);
        case url.match('/register') && method === 'POST':return this.auth.register(req);
        case url.match('/verify') && method === 'POST':return this.auth.verify(req);
        case url.match('/set-pin') && method === 'POST':return this.auth.setPin(req);
        case url.match('/login') && method === 'GET':return this.auth.autologin(req);
        case url.match('/login') && method === 'POST':return this.auth.login(req);
        case url.match('/update') && method === 'POST':return this.auth.update(req);
        case url.match('/logout') && method === 'POST':return this.auth.logout(req);
        /*
        case url.match(/users\/resendVerification/) && method === 'POST':return this.users.resendVerification(req);
        case url.match('/forgot/name') && method === 'POST':return this.auth.forgotName();
        case url.match('/forgot/pin') && method === 'POST':return this.auth.forgotPin();
        */
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}