import { Injectable, inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonUtils, CommonUtils as Utils } from '@utils';
import { InMemoryApiController,InMemApiJobFactoryService }from '../types';
import { PiMiaClient } from '../models';
import { AuthController } from './auth.controller';

@Injectable({providedIn:"root"})
export class PiMiaClientsController  extends InMemoryApiController<PiMiaClient,"piMiaClients"> {
  auth = inject(AuthController);
  constructor(){
    super();
    this.model = "piMiaClients";
    this.ctr = PiMiaClient;
    this.withStatus = true;
  }
  override all = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._load() as PiMiaClient[];
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
      creator:u._id,
      //reqNo:(this._last?Number(this._last.reqNo) + 1:1).toString().padStart(5,"0")
    };
    const n = this._add(newObj);
    console.log(newObj,n,this._load())
    const token = {_id:u.token?._id || null,type:"auth"};
    return this.ok({token,client:n?this._new(n).json():null});
  }
  fetchBySlug = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._findone({slug:this.paramFromUrl(req.url)}).m;
    return this.ok(m?this._new(m).json():null);
  }
  search = (req:HttpRequest<any>,seperator?:string) => {
    const fields = [
      "desc","user.username,user.id","user.email","user.location","status.name"
    ]
    const q = this.queryFromUrl(req.url,seperator)["q"];
    const m = this._searchInArray(this._load() as PiMiaClient[],q,fields);
    return this.ok(m.map(o_ => this._new(o_).json()));
  }
  saveActivity = (req:HttpRequest<any>) => {
    const u = this.auth.validateTknAndFindUser(req).m;
    const m = this._findone({slug:this.paramFromUrl(req.url)}).m;
    /*
    const n:PiMiaClient["activity"][0] = req.body.data;
    const a:PiMiaClient["activityLog"][0] = {
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
}