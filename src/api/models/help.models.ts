import { Status,LocationObj,PhoneNumber, CommonUtils } from '@common';
import { UserPreview } from './user.models';

export type HelpSRStatuses = "new"|"open-active"|"open-inactive"|"completed"|"closed"|"reopened"|"cancelled"|"processing"|"in-progress";

export type HelpSRType = {
  _id: string
  creator:string|UserPreview
  createdAt:string|Date
  published:string|Date
  status:Status<HelpSRStatuses>
  reqNo:string
  dueBy:string|Date
  reason:string
  desc: string
  type:"bug"|"feature"|"suggestion";
  title?:string
  rush?:boolean
  info?:string;
  resolution?:any;
  admin?:string|UserPreview;
  files?:string[];
};
export interface HelpSR extends HelpSRType {}
export class HelpSR {
  constructor(o:Partial<HelpSR>){
    const n:Partial<HelpSR> = {
      _id:CommonUtils.longId(),
      createdAt:new Date(),
      status:{name:"new",time:new Date()}};
    Object.assign(this,n,o);
  }
  json():HelpSR {
    const json = {...this};
    return json as HelpSR; 
  }
}
export type HelpSRQueryStringKeys = |"user.username"|"user.fullname"|"user.location"|"status.name"|"desc"|"type";
export type HelpSRQueryNumberKeys = "NA";
export type HelpSRQueryDateKeys = "createdAt"|"published"|"dueBy";
export type HelpSRQuery =
Partial<Record<HelpSRQueryStringKeys,string>> & 
Partial<Record<HelpSRQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<HelpSRQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;