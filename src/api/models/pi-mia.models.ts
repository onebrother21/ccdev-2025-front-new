import { Status,LocationObj,PhoneNumber, CommonUtils } from '@common';
import { UserPreview } from './user.models';

export type PiMiaClientStatuses = |"new"|"verified"|"locked"|"active"|"inactive"|"disabled"|"deleted"|"offline";
export type PiMiaClientType = {
  _id: string
  creator:string|UserPreview
  createdAt:string|Date
  updatedAt:string|Date
  status:Status<PiMiaClientStatuses>
  name:string;
  mgrName:string;
  mgrPhn:string;
  mgrEmail:string;
  type:string;
  loc:LocationObj;
};
export type PiMiaClientPreview = Pick<PiMiaClientType,"_id"|"name"|"mgrName">;
export type PiMiaClientJson = PiMiaClientPreview & {status:PiMiaClientStatuses};
export interface PiMiaClient extends PiMiaClientType {}
export class PiMiaClient {
  constructor(o:any){
    const n:Partial<PiMiaClient> = {
      _id:CommonUtils.longId(),
      createdAt:new Date(),
      status:{name:"new",time:new Date()}
    };
    Object.assign(this,n,o);
  }
  json():PiMiaClientJson {
    const preview = {
      _id:this._id,
      name:this.name,
      mgrName:this.mgrName,
      type:this.type,
      status:this.status.name,
    };
    return {...preview} as PiMiaClientJson;
  }
}


export type PiMiaCaseAttempt = {
  user:string;
  time:string|Date;
  route:{name:string;loc:LocationObj}[];
  contacts:{
    name:string;
    method:|"ftf"|"phn"|"email"|"other";
    rel:string;
    info:any;
  }[];
  images:string[];
  notes:{user:string;msg:string;time:string|Date;}[];
}
export type PiMiaCaseAttachment = {
  time:string|Date;
  loc:string|Date;
  name:string;
  type_:|"pdf"|"doc"|"docx"|"png"|"jpg"|"jpeg"|"aud"|"wav"|"mov4";
  size:number;
  ext:string;
  path?:string;
};
export type PiMiaCaseInvoice = Record<"submitted"|"sent"|"paid"|"receieved",Date> & {details:Record<string,number|[number,string|Date]>;};

/**
 * CASE PROPS
 */
export type PiMiaCaseTarget = {
  name:{
    first:string;
    last:string;
    middle?:string;
    suffix?:string;
  }
  idn:{
    dob:string|Date;
    ssn:string;
    dl:string;
    dlState:string;
    img:string;
  }
  demo:{
    race:string;
    ethnicity:string;
    sex:"M"|"F";
    gender:string;
  }
  info:any;
  emails:string[];
  phns:PhoneNumber[];
  addrs:LocationObj[];
  sm:string[];
};
export type PiMiaCaseInfo = Partial<{
  serviceRendered:string|Date;
  signatureAttained:string|Date;
  qnaCompleted:string[];
}>;
export type PiMiaCaseStatuses = "new"|"open-active"|"open-inactive"|"completed"|"closed"|"reopened"|"cancelled"|"processing"|"in-progress";

export type PiMiaCaseType = {
  _id: string
  creator:string|UserPreview
  createdAt:string|Date
  published:string|Date
  status:Status<PiMiaCaseStatuses>
  reqNo:string
  dueBy:string|Date
  desc: string
  reason:string
  type:"serviceReq"|"signatureReq"|"qnaReq";
  title?:string
  rush?:boolean
  startingBid?:number
  oboName?:string;
  oboAmt?:number;
  questions?:{q:string,a:string}[]
  info?:string;
  target:PiMiaCaseTarget;
  client:PiMiaClientPreview;
  resolution?:PiMiaCaseInfo;
  admin?:string|UserPreview;
  files?:(string|PiMiaCaseAttachment)[];
};
export interface PiMiaCase extends PiMiaCaseType {}
export class PiMiaCase {
  constructor(o:Partial<PiMiaCase>){
    const n:Partial<PiMiaCase> = {
      _id:CommonUtils.longId(),
      createdAt:new Date(),
      status:{name:"new",time:new Date()}};
    Object.assign(this,n,o);
  }
  json():PiMiaCase {
    const json = {...this};
    return json as PiMiaCase; 
  }
}
export type PiMiaCaseQueryStringKeys = |"user.username"|"user.fullname"|"user.location"|"status.name"|"desc"|"type";
export type PiMiaCaseQueryNumberKeys = "NA";
export type PiMiaCaseQueryDateKeys = "createdAt"|"published"|"dueBy";
export type PiMiaCaseQuery =
Partial<Record<PiMiaCaseQueryStringKeys,string>> & 
Partial<Record<PiMiaCaseQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<PiMiaCaseQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;