import { Injectable, inject } from "@angular/core";
import { CommonUtils as Utils,Newable } from "_commoncore/common";
import { InMemApiHandlersService } from "./in-mem-api-handlers.service";
import { AppLocalStorageService } from "core";

export interface InMemoryDbService<T,ModelName extends string> extends InMemApiHandlersService {
  model:ModelName;
  ctr?:Newable<T>;
  withStatus?:boolean;
};
@Injectable({providedIn:"root"})
export class InMemoryDbService<T extends {json():T|any},ModelName extends string> extends InMemApiHandlersService {
  local = inject(AppLocalStorageService);
  private __get = () => this.local.load("appDb");
  private __set = <T>(o?:T) => this.local.save("appDb",o);
  _get = () => this.__get()[this.model] as T|T[];
  _set = (obj:T|T[]) => this.__set({...this.__get(),[this.model]:obj});
  _arr = (model:T|T[]):model is T[] => Utils.isArr<T>(model);
  _new = (m?:any) => (this.ctr?new this.ctr(m||{}):m||{}) as T;
  _load = () => {
    const model = this._get();
    return this._arr(model)?
    model.map(o_ => this._new(o_)):
    this._new(model);
  };
  get _length(){return (this._load() as T[]).length}
  get _first(){return (this._load() as T[])[0]}
  get _last(){return (this._load() as T[])[(this._load() as T[]).length - 1]}
  _add = (obj:T) => {
    let model = this._load();
    const instance = this._new(obj);
    this._arr(model)?model.push(instance):model = instance;
    this._set(model);
    return instance;
  };
  _save = (obj:T,i?:number) => {
    let model = this._load();
    const instance = this._new(obj);
    this._arr(model)?Utils.isNum(i)?model[i] = instance:null:model = instance;
    this._set(model);
    return instance;
  };
  _update = (q:Record<string,any>,upd:Partial<T>):{m:T|null;i:number} => {
    let model = this._load();
    if(!this._arr(model)){
      model = this._new({...model,...upd});
      this._save(model);
      return {m:model,i:0};
    }
    else {
      const m = this._findInArray(model,q)[0];
      if(m){
        for(const k in upd) m[k] = upd[k as keyof T];
        const i = model.findIndex((m_:any) => m_.id == m.id);
        this._save(m,i);
        return {m,i};
      }
      else return {m:null,i:-1};
    }
  };
  _remove = (q:Record<string,any>):{removed:boolean} => {
    let model = this._load();
    if(!Array.isArray(model)){
      this._set(undefined as any as T);
      return {removed:true};
    }
    else {
      const M = this._findInArray(model,q);
      if(M[0]){
        model = model.filter((x:any) => x.id !== M[0].id);
        this._set(model);
        return {removed:true};
      }
      else return {removed:false};
    }
  };
  _find = (q:Record<string,any>,or?:boolean):T[] => {
    let model = this._load();
    if(!Array.isArray(model)) return model?[model]:[];
    else return this._findInArray(model,q);
  };
  _findone = (q:Record<string,any>,or?:boolean):{m:T|null;i:number} => {
    let model = this._load();
    if(!Array.isArray(model)) return {m:model,i:0};
    else {
      const M = this._findInArray(model,q);
      if(M[0]){
        const i = model.findIndex((m:any) => m.id == M[0].id);
        return {m:M[0],i};
      }
      else return {m:null,i:-1};
    }
  };
  _findInArray = (model:any[],q:Record<string,any>) => {
    let M:any[] = model;
    const finder = (m:any[],p:string,v:any) => {
      let R:any[] = [];
      if(!Utils.is(v)) return m;
      for(let i =0,l = m.length;i<l;i++){
        const prev = this._resolvePath(m[i],p);
        const curr = v;
        const isMatch = this._validateQuery(p,prev,curr);
        //console.log({model:m[i],prop:p,prev,curr,isMatch})
        if(isMatch) R.push(m[i]);
      }
      return R;
    };
    const qkeys = Object.keys(q);
    for(let i = 0,l = qkeys.length;i<l;i++) M = finder(M,qkeys[i],q[qkeys[i]]);
    //console.log(M)
    return M;
  };
  _searchInArray = (model:any[],q:string,fields:string[]) => {
    let M:any[] = model;
    let a:any[] = [];
    let I:number[] = [];
    for(let i = 0,l = fields.length;i<l;i++){
      for(let j =0,k = M.length;j<k;j++){
        if(!I.includes(j)){
          const v = this._resolvePath(M[j],fields[i]);
          if(new RegExp(q,'i').test(v)){a.push(M[j]);I.push(j);}
        }
      }
    }
    return a;
  };
  _resolvePath(obj:any,path:string|string[],separator = '.') { 
    const props = Array.isArray(path)?path:path.split(separator); 
    return props.reduce((prev, curr) => prev && prev[curr],obj);
  }
  _validateQuery = (prop:string,prev:any,curr:any = {}) => {
    const currType = typeof curr;
    const prevType = typeof prev;
    const ofSameType = currType === prevType;
    const time = (o?:string|Date) => o?new Date(o).getTime():0;
    switch(true){
      case Utils.isNum(prev) && Utils.isObj(curr):{
        const curr_ = {...curr} as any;
        switch(true){
          case !!curr_["eq"]:{return prev == curr_["eq"];}
          case !!curr_["not"]:{return prev !== curr_["not"];}
          default:{
            return prev >= (curr_["min"] || -Infinity) &&
            prev <= (curr_["max"] || Infinity);
          }
        }
      }
      case Utils.isDate(prev)&& Utils.isObj(curr):{
        const curr_ = {...curr} as any;
        switch(true){
          case !!curr_["eq"]:{return time(prev) == time(curr_["eq"]);}
          case !!curr_["not"]:{return time(prev) !== time(curr_["not"]);}
          default:{
            return (time(prev) >= (time(curr_["min"]) || -Infinity)) &&
            (time(prev) <= (time(curr_["max"]) || Infinity));
          }
        }
      }
      case Utils.isArr(prev):
      case Utils.isObj(prev):{console.warn(prop,"non-querable");return false;}
      case !ofSameType:{
        console.warn(prop,"non-comparable",{prevType,currType});
        return false;
      }
      default:{
        switch(prevType){
          case "string":
          case "number":
          case "boolean":return prev == curr;
          default:return false;
        }
      }
    }
  }
}