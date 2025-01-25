import { Status,LocationObj,PhoneNumber, CommonUtils } from '@common';
import { UserPreview } from './user.models';

export type PokerVenue = LocationObj;
export type PokerEntry = {
  type:"cash"|"tourney";
  date:string|Date;
  time:string|number|Date;
  desc:string;
  venue:PokerVenue;
  buyin:number;
  payout:number;
  results?:number|"dnp";
  images:string[];
  notes:{user:string;msg:string;time:string|Date;}[];
}
export type PokerPlanStatuses = "new"|"open-active"|"open-inactive"|"completed"|"closed"|"reopened"|"cancelled"|"processing"|"in-progress";
export type PokerPlanType = {
  _id: string
  creator:string|UserPreview
  createdAt:string|Date
  published:string|Date
  name:string
  motto?:string
  bio?:string
  status:Status<PokerPlanStatuses>
  startDate:Date
  startBal:number
  endDate:Date
  endBal:number
  venues:PokerVenue[];
  entries:PokerEntry[];
  params:{
    expPlayRate:"wk"|"2wk"|"3wk"|"mo"|"3mo"|"6mo"|"yr"
    expCTTRatio:number
    expHitRate:number
    expReturn:number
    stdError:number
  }
};
export interface PokerPlan extends PokerPlanType {}
export class PokerPlan {
  constructor(o:Partial<PokerPlan>){
    const n:Partial<PokerPlan> = {
      _id:CommonUtils.longId(),
      createdAt:new Date(),
      status:{name:"new",time:new Date()}
    };
    Object.assign(this,n,o);
  }
  json():PokerPlan {
    const json = {...this};
    return json as PokerPlan; 
  }
}
export type PokerPlanQueryStringKeys = |"creator.username"|"creator.fullname"|"creator.location"|"status.name"|"desc";
export type PokerPlanQueryNumberKeys = |"startBal"|"endBal";
export type PokerPlanQueryDateKeys = "createdAt"|"published"|"startDate"|"endDate";
export type PokerPlanQuery =
Partial<Record<PokerPlanQueryStringKeys,string>> & 
Partial<Record<PokerPlanQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<PokerPlanQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;
export type PokerPlanInfoKeys = |"name"|"bio"|"motto"|"startDate"|"startBal"|"endDate"|"endBal"|"entries";