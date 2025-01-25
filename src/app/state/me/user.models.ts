import { IUser, LocationObj, Status } from "@types";
import { CommonUtils } from "@utils";

export interface User extends IUser {}
export class User {
  constructor(o:Partial<IUser>){
    const n = {
      id:CommonUtils.longId(),
      status:{name:"new",time:new Date()},
      createdOn:new Date(),
      updatedOn:new Date(),
    };
    return Object.assign(this,n,o);
  }
  preview() {
    return {
      id:this.id,
      name:this.name,
      email:this.email,
      location:this.location,
    }
  }
  json(me?:boolean):UserJson {
    const preview = {
      _id:this._id,
      name:this.name,
      username:this.username,
      email:this.email,
      location:this.location,
    };
    const user = {
      age:this.toAge(),
      status:this.status.name,
      bio:this.bio,
      title:this.title,
    };
    return {...preview,...(me?user:{})} as UserJson;
  }
  toAge(){
    const dob = CommonUtils.dateParserX(this.dob);
    if(dob){
      const yrInMS = 1000 * 60 * 60 * 24 * 365.25;
      const ageInMS = Date.now() - new Date(dob).getTime();
      const ageInYrs = ageInMS/yrInMS;
      const age = Number(ageInYrs.toFixed(0));
      return age;
    }
    else return null;
  }
}

export type UserPreview = Pick<UserType,"_id"|"email"|"username"|"location"|"img"|"name">;
export type UserJson = UserPreview & Pick<UserType,"bio"|"title"> & {age:number;status:UserStatuses;};