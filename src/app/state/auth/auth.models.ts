import { User, UserJson, UserPreview, UserType } from '../me';
import { Digit } from '@types';

export type Pin = `${Digit}${Digit}${Digit}${Digit}`;
export type AuthUserScopes = "GUEST"|"USER"|"ADMN"|"SUPR"|"SYS";
export type AuthTokenPublic = {_id:string;type:"req"|"auth"|"api";};
export type AuthTokenPrivate = {
  user:string;
  role:AuthUserScopes;
  issued:Date;
  expires:Date;
  expiresStr:string;
};
export type AuthToken = AuthTokenPublic & AuthTokenPrivate;
export type AuthEvents = "created"|"registered"|"verified"|"loggedout"|"loggedin"|"reset"|"updated";
export type AuthMeta = Partial<Record<AuthEvents,string|Date>>;

export type AuthParams = {
  pin:Pin;
  reset:string|null;
  verification:string|null;
  verificationSent:Date;
  token:AuthToken|null;
  scopes:AuthUserScopes[];
  meta:AuthMeta;
};
export type AuthUserType = UserType & AuthParams;
export type AuthUserPublicParams = {
  token:AuthTokenPublic|null;
  meta:AuthUserType["meta"]
};
export type AuthUserPreview = UserPreview & AuthUserPublicParams;
export type AuthUserJson = UserJson & AuthUserPublicParams;
export interface AuthUser extends AuthUserType {}
export class AuthUser extends User {
  jsonAuth(auth?:boolean):AuthUserJson {
    const json = this.json(auth);
    const {token,meta} = this;
    const {_id,type} = token || {};
    return {...json,token:{_id,type} as any,meta};
  }
}