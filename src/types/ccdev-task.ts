import { IUser } from "./ccdev-user";
import { Status } from "./ccdev-common";

export interface INote {
  user:IUser;
  msg:string;
  time:Date;
  slug:string;
}
export interface ITaskMethods {
  preview():Pick<ITask,"id"|"name"|"category"|"type"|"description"|"status">;
  json():Partial<ITask>;
}
export interface ITask extends ITaskMethods {
  id:string;
  creator:IUser;
  createdOn:Date;
  updatedOn:Date;
  status:Status<"new"|"in-progress"|"completed"|"cancelled"|"pending"|"reopened"|"closed">;
  dueOn:Date;
  category:string;
  type:string;
  name:string;
  description?:string;
  amt?:number;
  progress?:number;
  recurring?:boolean;
  recurringInterval?:string;
  tasks:ITask[];
  notes:INote[];
  resolution?:string;
  reason?:string;
}