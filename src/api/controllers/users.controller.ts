import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonUtils as Utils } from '@utils';
import { InMemoryApiController,InMemApiJobFactoryService }from '../types';
import { User } from '../models';

@Injectable({providedIn:"root"})
export class UsersController  extends InMemoryApiController<User,"users"> {
  constructor(
    //private notifier:MockNotifier
  ){
    super();
    this.model = "users";
    this.ctr = User;
    this.withStatus = true;
  }
  override update = (req:HttpRequest<any>) => {
    const m = this._update({id:this.paramFromUrl(req.url)},req.body.data).m;
    return this.ok(m?this._new(m).json(true):null);
  }
  fetchByEmail = (req:HttpRequest<any>) => {
    const m = this._findone({email:this.paramFromUrl(req.url)}).m;
    return this.ok(m?this._new(m).json():null);
  }
  save = (req:HttpRequest<any>) => {
    const {body:{data}} = req;
    const {m} = this._findone({email:data.email});
    if(m) return this.e["existingUser"]();
    const n = this._new({...data,verification:Utils.shortId().toLocaleUpperCase()});
    this._add(n);
    //setTimeout(() => this.notifier.send("verification",n.verification as string),500);
    return this.ok(n.json());
  };
}