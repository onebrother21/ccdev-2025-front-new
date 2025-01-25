import { IUser } from "./ccdev-user";
import { AddressObj, Status } from "./ccdev-common";

export type IApprovalStatuses = "requested"|"approved"|"rejected"|"pending";
export type IVehicle = {
  VIN:string;
  make:string;
  model:string;
  trim?:string;
  year:number;
  color:string;
  mileage:number;
  plateNo:string;
  plateSt:string;
};
export type ILicenseInfo = {
  num:string;
  state:string;
  expires:Date;
};
export type IInsuranceInfo = {
  num:string;
  state:string;
  expires:Date;
  agent:string;
  insurer:string;
  vehicle:string
};
export interface ICustomerMethods {
  json():Partial<ICustomer>;
}
export interface ICustomer extends ICustomerMethods {
  id:string;
  name:string;
  img:string;
  address:AddressObj;
  license:ILicenseInfo;
  user:IUser;
}
export interface IVendorMethods {
  json():Partial<IVendor>;
}
export interface IVendor extends IVendorMethods {
  id:string;
  name:string;
  img:string;
  address:AddressObj;
  license:ILicenseInfo;
  approval:Status<IApprovalStatuses>[];
  user:IUser;
}
export interface ICourierMethods {
  json():Partial<ICourier>;
}
export interface ICourier extends ICourierMethods {
  id:string;
  name:string;
  img:string;
  vehicle:IVehicle;
  license:ILicenseInfo;
  insurance:any;
  approval:Status<IApprovalStatuses>[];
  user:IUser;
}

export interface IAdminMethods {
  json():Partial<IAdmin>;
}
export interface IAdmin extends IAdminMethods {
  id:string;
  name:string;
  img:string;
  scopes:string[];
  approval:Status<IApprovalStatuses>[];
  user:IUser;
}