

import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { InMemoryDbService } from "./in-mem-api-db.service";

@Injectable({providedIn:"root"})
export class InMemoryApiController<T extends {json():T|any},model extends string> extends InMemoryDbService<T,model> {
  all = (req:HttpRequest<any>) => {
    const v = this._load() as T[];
    const j = v.map(m => this._new(m).json());
    return this.ok(j);
  };
  query = (req:HttpRequest<any>,seperator?:string) => {
    const m = this._find(this.queryFromUrl(req.url,seperator));
    return this.ok(m.map(m => this._new(m).json()));
  }
  lookup = (req:HttpRequest<any>,seperator?:string) => {
    const m = this._findone(this.queryFromUrl(req.url,seperator)).m;
    console.log(this.queryFromUrl(req.url,seperator),m)
    return this.ok({exists:!!m});
  }
  create = (req:HttpRequest<any>) => {
    const m = this._add({
      ...req.body.data,
      ...this.withStatus?{status:{name:"new",time:new Date()}}:null,
    });
    return this.ok(m?this._new(m).json():null);
  }
  fetch = (req:HttpRequest<any>) => {
    const m = this._findone({id:this.paramFromUrl(req.url)}).m;
    return this.ok(m?this._new(m).json():null);
  }
  update = (req:HttpRequest<any>) => {
    const m = this._update({id:this.paramFromUrl(req.url)},req.body.data).m;
    return this.ok(m?this._new(m).json():null);
  }
  remove = (req:HttpRequest<any>) => {
    const id = this.paramFromUrl(req.url);
    const m = this._remove({id});
    return this.ok(m?{id,ok:m.removed}:null);
  }
}
