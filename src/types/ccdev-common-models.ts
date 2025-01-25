import { HttpErrorResponse } from "@angular/common/http";
import { Params,Data } from "@angular/router";
import { Strings,Entity,ErrorObj,ErrorConfig,LocaleDateOpts,AnyBoolean,Status } from "./ccdev-common";
import { CommonUtils as Utils } from '../utils';

export type AppRoute = {url:string;} & Partial<{query:Params;params:Params;data:Data;}>;
export type AppNavItem<t extends string = "_none_"> = Partial<{
  type:t;
  label:string;
  url:string;
  text:string;
  img:string;
  icon:string;
  classes:string;
  children:AppNavItem[];
  active:boolean;
  disabled:boolean;
  action:string;
}>;
export interface AppLocals {dateFormat: LocaleDateOpts;}
export type AppTable = Partial<{
  title:string;
  fields:any;
  headers:string[];
  rows:any[][];
  footer:Record<string,string>;
}>;

export interface AppEntity<k extends string|"new" = "new"> extends Entity {status:Status<k>;}
export class AppEntity<k extends string|"new" = "new"> {
  constructor(o:any = {}){
    const n:Partial<AppEntity<k>> = {
      id:Utils.longId().replace(/-/g,"").toLocaleUpperCase(),
      cid:Utils.generateSixDigitCode(),
      createdOn:o.createdAt || new Date(),
      status:{name:"new" as k,time:new Date()}
    };
    Object.assign(this,n,o);
  }
}
export interface DocEntity<k extends string|"new" = "new"> extends AppEntity<k> {
  published?:string|Date;
  tags?:string[];
  title?:string;
  slug?:`${string}-${string}`;
  content?:any;
  images?:string[];
  files?:string[];
}
export class DocEntity<k extends string|"new" = "new"> extends AppEntity<k> {}
export interface AppError extends ErrorObj {}
export class AppError extends Error {
  constructor(o:string|number|Error|ErrorConfig,src = "unknown"){
    let _o:Partial<AppError> = {src};
    switch(true){
      case typeof o === "string":super(o);break;
      case typeof o === "number":super("oops, something went wrong");_o.status = o;break;
      case o instanceof Error:super(o.message);_o.name = o.name;break;
      case Utils.isObj(o):{
        super(o.message || o.msg || "oops, something went wrong");
        _o = {...o};
        break;
      };
      default:{super("oops, something went wrong");break;}
    }
    if((Error as any).captureStackTrace){(Error as any).captureStackTrace(this,AppError);}
    Object.assign(this,new AppEntity({status:500,..._o}));
  }
  json(verbose?:AnyBoolean){
    const e = this;
    const data = {
      name:e.name,
      message:e.message,
      status:e.status,
      createdOn:e.createdOn,
      src:e.src||"",
    };
    const dataVerbose = {
      code:e.code,
      errors:e.errors,
      warning:e.warning,
      info:e.info||e.msg,
      stack:e.stack,
    };
    return !verbose?data:Object.assign(data,dataVerbose);
  }
}
export type AppAlertType = {
  type:"error"|"success"|"warn"|"info";
  title:string;
  duration:number;
  message?:string;
  error?:HttpErrorResponse|Error|AppError;
  warn?:HttpErrorResponse|Error|AppError;
  data?:Strings;
  confirm?:boolean;
};
export interface AppAlert extends AppAlertType,AppEntity {}
export class AppAlert extends AppEntity {
  constructor(o:AppAlertType){super(o);}
  json(){return {...this};}
}