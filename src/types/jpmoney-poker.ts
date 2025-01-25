import { INote } from "./ccdev-task";
import { IUser } from "./ccdev-user";
import { AddressObj, Status } from "./ccdev-common";

export type IPokerVenue = AddressObj & {name:string,desc?:string};
export type IPokerEntry = {
  type:"cash"|"tourney";
  startTime:Date;
  arrivalTime:Date;
  desc:string;
  venue:IPokerVenue;
  payins:(Status<string> & {amount:number})[];
  payouts:(Status<string> & {amount:number})[];
  players:number;
  results:number|"dnp"|"cash";
  images:string[];
  notes:INote[];
}
export type IPokerPlanStatuses = "new"|"active"|"inactive"|"completed"|"closed"|"reopened"|"cancelled"|"processing"|"in-progress";
export type IPokerPlanType = {
  id: string
  creator:IUser;
  createdOn:Date
  updatedOn:Date
  published:Date
  name:string
  motto?:string
  bio?:string
  desc?:string
  status:Status<IPokerPlanStatuses>;
  startDate:Date
  startBal:number
  endDate:Date
  endBal:number
  venues:IPokerVenue[];
  entries:IPokerEntry[];
  params:{
    expPlayRate:"wk"|"2wk"|"3wk"|"mo"|"3mo"|"6mo"|"yr"
    expCTTRatio:number
    expHitRate:number
    expReturn:number
    stdError:number
  }
};
export interface IPokerPlanMethods {
  json(role:string):Partial<IPokerPlan>;
}
export interface IPokerPlan extends IPokerPlanType,IPokerPlanMethods {}


export type PokerPlanQueryStringKeys = |"creator.username"|"creator.fullname"|"creator.location"|"status.name"|"desc";
export type PokerPlanQueryNumberKeys = |"startBal"|"endBal";
export type PokerPlanQueryDateKeys = "createdAt"|"published"|"startDate"|"endDate";
export type PokerPlanQuery =
Partial<Record<PokerPlanQueryStringKeys,string>> & 
Partial<Record<PokerPlanQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<PokerPlanQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;
export type PokerPlanInfoKeys = |"name"|"bio"|"motto"|"startDate"|"startBal"|"endDate"|"endBal"|"entries";