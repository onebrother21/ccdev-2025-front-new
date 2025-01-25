import { IUserJson, IUserPreview, IUserRoles, IUserType } from "./ccdev-user";
import { Digit } from "./ccdev-common";

export type Pin = `${Digit}${Digit}${Digit}${Digit}`;
export type AuthToken = {
  type:"req"|"auth"|"api";
  user:string;
  role:IUserRoles;
  issued:Date;
  expires:Date;
  expiresStr:string;
};
export type AuthEvents = "created"|"registered"|"verified"|"loggedout"|"loggedin"|"reset"|"updated";
export type AuthActivity = Record<AuthEvents,any>[]
export type AuthParams = {
  //pin:Pin;
  password:string;
  reset:string|null;
  verification:string|null;
  verificationSent:Date;
  token:AuthToken|null;
  activity:AuthActivity;
};
export type AuthUserType = IUserType & AuthParams;
export type AuthUserPublicParams = {token:string|null;};//meta:AuthMeta;};
export type AuthUserPreview = IUserPreview & AuthUserPublicParams;
export type AuthUserJson = IUserJson & AuthUserPublicParams;