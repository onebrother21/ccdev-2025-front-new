import { Injectable, inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonUtils, CommonUtils as Utils } from '@utils';
import { InMemoryApiController,InMemApiJobFactoryService }from '../types';
import { PokerPlan } from '../models';
import { AuthController } from './auth.controller';

@Injectable({providedIn:"root"})
export class JPMoneyController  extends InMemoryApiController<PokerPlan,"jpmoneyPokerPlans"> {
  jobQ = inject(InMemApiJobFactoryService);
  auth = inject(AuthController);
  constructor(){
    super();
    this.model = "jpmoneyPokerPlans";
    this.ctr = PokerPlan;
    this.withStatus = true;
  }
  override all = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._load() as PokerPlan[];
    const token = {_id:u.token?._id || null,type:"auth"};
    const results = m.map(m_ => this._new(m_).json());
    return this.ok({token,results});
  };
  override query = (req:HttpRequest<any>,seperator?:string) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._find(this.queryFromUrl(req.url,seperator));
    const token = {_id:u.token?._id || null,type:"auth"};
    const results = m.map(m => this._new(m).json());
    return this.ok({token,results});
  }
  override create = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const status = {name:"new",time:new Date()};
    const newObj = {
      ...req.body.data,
      ...this.withStatus?{status}:null,
      creator:u.preview,
    };
    const n = this._add(newObj);
    const token = {_id:u.token?._id || null,type:"auth"};
    return this.ok({token,plan:n?this._new(n).json():null});
  }
  fetchBySlug = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._findone({slug:this.paramFromUrl(req.url)}).m;
    return this.ok(m?this._new(m).json():null);
  }
  search = (req:HttpRequest<any>,seperator?:string) => {
    const fields = [
      "desc","creator.username,creator.id","creator.email","creator.loc","status.name"
    ]
    const q = this.queryFromUrl(req.url,seperator)["q"];
    const m = this._searchInArray(this._load() as PokerPlan[],q,fields);
    return this.ok(m.map(o_ => this._new(o_).json()));
  }
  saveActivity = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._findone({slug:this.paramFromUrl(req.url)}).m;
    /*
    const n:JPMoneyPokerPlan["activity"][0] = req.body.data;
    const a:JPMoneyPokerPlan["activityLog"][0] = {
      user:u.username,
      action:"added",
      type:n.type,
      time:new Date(),
      item:n.id
    };
    m.activity.push(n);
    m.activityLog.push(a);
    */
    return this.ok(m?this._new(m).json():null);
  }
  runCalcOne = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    this.jobQ.addJob("calc-in-app",{type:"calc-1",data:{userName:u.email,n:req.body.n}});
    const token = {_id:u.token?._id || null,type:"auth"};
    return this.ok({token,result:"success"});
  }
  runCalcTwo = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    this.jobQ.addJob("calc-in-app",{type:"calc-2",data:{userName:u.email,n:req.body.n}});
    const token = {_id:u.token?._id || null,type:"auth"};
    return this.ok({token,result:"success"});
  }
}