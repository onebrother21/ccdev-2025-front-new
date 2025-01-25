import { createAction } from "@ngrx/store";
import { AuthTokenPublic, AuthUser,AuthUserJson, AuthUserPreview } from "./auth.models";
import { AppError } from "@types";
import { AuthFeatureState } from "./auth.state";

export const AuthenticationActions = {
  
  loadAuthState:createAction("@app/auth/load-state",(o:AuthFeatureState) => ({payload:o})),

  errorInAuthState:createAction("@app/auth/error",(o:AppError) => ({payload:o})),
  errorInAuthForm:createAction("@app/auth/form/error",(o:string|AppError) => ({payload:o})),

  userPopulated:createAction("@app/auth/user-populated",(o:{appId:string,user:AuthUserPreview|null,token:AuthTokenPublic|null}) => ({payload:o})),

  autologin:createAction("@app/auth/autologin"),

  signupUser:createAction("@app/auth/signup",(o:Pick<AuthUser,"email">) => ({payload:o})),
  signupUserSuccess:createAction("@app/auth/signup-success",(o:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:o})),
  
  lookupUser:createAction("@app/auth/lookup",(o:Pick<AuthUser,"email">) => ({payload:o})),
  lookupUserSuccess:createAction("@app/auth/lookup-success",(o:boolean) => ({payload:o})),

  verifyUser:createAction("@app/auth/verify",(o:{verification:string}) => ({payload:o})),
  verifyUserSuccess:createAction("@app/auth/verify-success",(o:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:o})),

  registerUser:createAction("@app/auth/register",(o:Partial<AuthUser>) => ({payload:o})),
  registerUserSuccess:createAction("@app/auth/register-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),

  registerV2User:createAction("@app/auth/register-v2",(o:Partial<AuthUser>) => ({payload:o})),
  registerV2UserSuccess:createAction("@app/auth/register-v2-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),

  setUserPin:createAction("@app/auth/set-pin",(o:Pick<AuthUser,"pin">) => ({payload:o})),
  setUserPinSuccess:createAction("@app/auth/set-pin-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),

  signinRequired:createAction("@app/auth/signin-required"),
  signinUser:createAction("@app/auth/signin",(o:Pick<AuthUser,"email"|"username">) => ({payload:o})),
  signinUserSuccess:createAction("@app/auth/signin-success",(o:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:o})),
  
  signinAdminUser:createAction("@app/auth/signin-admin",(o:Pick<AuthUser,"username">) => ({payload:o})),
  signinAdminUserSuccess:createAction("@app/auth/signin-admin-success",(o:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:o})),

  
  loginUser:createAction("@app/auth/login",(o:{emailOrUsername:string} & Pick<AuthUser,"pin">) => ({payload:o})),
  loginUserSuccess:createAction("@app/auth/login-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),

  loginV2User:createAction("@app/auth/login-v2",(o:Pick<AuthUser,"pin">) => ({payload:o})),
  loginV2UserSuccess:createAction("@app/auth/login-v2-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),
  
  updateUser:createAction("@app/auth/update",(o:Partial<AuthUser>) => ({payload:o})),
  updateUserSuccess:createAction("@app/auth/update-success",(s:{user:AuthUserJson,token:AuthTokenPublic}) => ({payload:s})),

  logoutUser:createAction("@app/auth/logout",() => ({payload:true})),
  setUrlAfterLogin:createAction("@app/auth/set-url-after-login",(s:string) => ({payload:s})),

  loginByGoogle:createAction("@app/auth/login-google",(o?:any) => ({payload:o})),
  loginByFacebook:createAction("@app/auth/login-fb",(o?:any) => ({payload:o})),
  registerByGoogle:createAction("@app/auth/register-google",(o?:any) => ({payload:o})),
  registerByFacebook:createAction("@app/auth/register-fb",(o?:any) => ({payload:o})),
};
