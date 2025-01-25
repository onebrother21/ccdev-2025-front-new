export type Pin = `${Digit}${Digit}${Digit}${Digit}`;
export type AuthRoles = "guest"|"user"|"courier"|"vendor"|"admin";
export type AuthToken = {
  type:"req"|"auth"|"api";
  user:string;
  role:AuthRoles;
  issued:Date;
  expires:Date;
  expiresStr:string;
};
export type AuthEvents = "created"|"registered"|"verified"|"loggedout"|"loggedin"|"reset"|"updated";
export type AuthActivity = Partial<Record<AuthEvents,string|Date>>;
export type AuthParams = {
  pin:Pin;
  reset:string|null;
  verification:string|null;
  verificationSent:Date;
  token:AuthToken|null;
  scopes:string[];
  activity:AuthActivity;
};
export type AuthUserType = IUserType & AuthParams;
export type AuthUserPublicParams = {token:string|null;meta:AuthMeta;};
export type AuthUserPreview = UserPreview & AuthUserPublicParams;
export type AuthUserJson = UserJson & AuthUserPublicParams;
export interface AuthUser extends AuthUserType {}
export class AuthUser extends User {
  jsonAuth(auth?:boolean):AuthUserJson {
    const json = this.json(auth);
    const {token:{id},meta} = this;
    //console.log(json,token,meta);
    return {
      ...json,
      ...(token?{token} as any:null),
      meta
    };
  }
}