import { Status,LocationData,PhoneNumber } from '@common';
import { UserPreview } from './user.models';

export type CaseAttempt = {
  user:string;
  time:string|Date;
  route:{name:string;loc:LocationData}[];
  contacts:{
    name:string;
    method:|"ftf"|"phn"|"email"|"other";
    rel:string;
    info:any;
  }[];
  images:string[];
  notes:{user:string;msg:string;time:string|Date;}[];
}
export type CaseAttachment = {
  time:string|Date;
  loc:string|Date;
  name:string;
  type_:|"pdf"|"doc"|"docx"|"png"|"jpg"|"jpeg"|"aud"|"wav"|"mov4";
  size:number;
  ext:string;
  path?:string;
};
export type CaseInvoice = Record<"submitted"|"sent"|"paid"|"receieved",Date> & {details:Record<string,number|[number,string|Date]>;};

/**
 * CASE PROPS
 */
export type CaseTarget = {
  name:string;
  dob:string|Date;
  emails?:string[];
  phns?:PhoneNumber[];
  addrs?:LocationData[];
};
export type CaseInfo = Partial<{
  serviceReq:boolean;
  signatureReq:boolean;
  qna:string[];
  serviceRendered:string|Date;
  signatureAttained:string|Date;
  qnaCompleted:string[];
}>;
export type CaseStatuses = "new"|"open-active"|"open-inactive"|"completed"|"closed"|"reopened"|"cancelled"|"processing"|"in-progress";

export type CaseType = {
  _id: string
  creator:UserPreview
  createdAt:string|Date
  published:string|Date
  status:Status<CaseStatuses>
  desc: string
  title:string
  reqNo:string
  dueBy:string|Date
  isHot?:boolean
  rush?:boolean
  startingBid?:number
  target:CaseTarget
  info:CaseInfo
  client:UserPreview
  admin?:UserPreview
  files?:(string|CaseAttachment)[]
};
export interface Case extends CaseType {}
export class Case {
  constructor(o:Partial<Case>){
    const n:Partial<Case> = {reqNo:o.reqNo || "",dueBy:new Date()};
    Object.assign(this,n,o);
  }
  json():Case {
    const json = {...this};
    return json as Case; 
  }
}
export type CaseQueryStringKeys = |"user.username"|"user.fullname"|"user.location"|"status.name"|"desc"|"type";
export type CaseQueryNumberKeys = "NA";
export type CaseQueryDateKeys = "createdAt"|"published"|"dueBy";
export type CaseQuery =
Partial<Record<CaseQueryStringKeys,string>> & 
Partial<Record<CaseQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<CaseQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;