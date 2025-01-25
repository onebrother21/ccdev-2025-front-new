import { UserJson } from "@state";
import { IUser,IUserJson,IUserRoles,LocationObj, Status } from "@types";
import { CommonUtils } from "@utils";

export interface User extends IUser  {
  _id:string
}
export class User {
  constructor(o:Partial<IUser>){
    const n = {
      id:CommonUtils.longId(),
      status:[{name:"new",time:new Date()}],
      createdOn:new Date(),
      updatedOn:new Date(),
    };
    return Object.assign(this,n,o);
  }
  preview(){
    return {
      id:this._id,
      name:this.name,
      email:this.email,
      location:this.location,
    };
  }
  json(role:IUserRoles,auth?:boolean):IUserJson {
    const json:Partial<UserJson> =  Object.assign({role},this.preview());
    if(auth) {
      const profile = this.profiles[role == "user"?"customer":role];
      json.profile = profile?profile.json():{};
      json.status = this.status[this.status.length - 1].name;
      json.bio = this.bio;
      json.title = this.title;
      json.prefs = this.prefs;
      json.age = this.toAge();
      json.createdOn = this.createdOn;
      json.updatedOn = this.updatedOn;
    };
    return json;
  }
  toAge(){
    const dob = CommonUtils.dateParserX(this.dob);
    if(dob){
      const yrInMS = 1000 * 60 * 60 * 24 * 365.25;
      const ageInMS = Date.now() - new Date(dob).getTime();
      const ageInYrs = ageInMS/yrInMS;
      const age = Number(ageInYrs.toFixed(0));
      console.log(dob,ageInMS,ageInYrs);
      return age;
    }
    else return null;
  }
}
