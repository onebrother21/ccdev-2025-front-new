import { IAdmin, ICourier, ICustomer, IVendor } from "./hashdash-profiles";
import { LocationObj, Status } from "./ccdev-common";

export type IUserStatuses = "new"|"active"|"inactive"|"disabled"|"enabled"|"locked"|"deleted"|"verified";
export type IUserRoles = "guest"|"user"|"courier"|"vendor"|"admin";
export type IUserType = {
  id: string;
  role:IUserRoles;
  createdOn:string|Date;
  updatedOn:string|Date;
  status:Status<IUserStatuses>[];
  email:string;
  name:{first:string;last:string;};
  dob:string|Date;
  mobile: string;
  location:string;
  loc?:LocationObj;
  img?:string;
  bio?:string;
  title?:string;
  agree:Date;
  prefs:Partial<{
    acceptTerms:Date;
    acceptUA:Date;
    acceptCookies:Date;
    acceptPrivacy:Date;
  }>;
  profiles:{
    admin?:IAdmin;
    courier?:ICourier;
    customer?:ICustomer;
    vendor?:IVendor;
  };
};
export type IUserAddlProps = {
  isAgeVerified:boolean;
  isLicenseVerified:boolean;
}
export interface IUserMethods {
  preview():IUserPreview;
  toAge():number|null;
  json(role:string,auth?:boolean):Partial<IUserJson>;
}
export type IUserPreview = Pick<IUserType,"id"|"email"|"location"|"img"|"name"|"createdOn"|"updatedOn">;
export type IUserJson = IUserPreview & Pick<IUserType,"bio"|"title"> & {
  age:number;
  status:IUserStatuses;
  profile:IAdmin|ICourier|ICustomer|IVendor;
};
export interface IUser extends IUserType,IUserMethods {}