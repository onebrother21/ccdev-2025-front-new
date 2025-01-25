import { createAction } from "@ngrx/store";
import { 
  AppError,
  IUserJson,
  IUserPreview,
} from "@types";
import { AuthFeatureState } from "./auth.state";

export const AuthenticationActions = {
  
  loadAuthState:createAction("@app/auth/load-state",(o:AuthFeatureState) => ({payload:o})),

  errorInAuthState:createAction("@app/auth/error",(o:AppError) => ({payload:o})),
  errorInAuthForm:createAction("@app/auth/form/error",(o:string|AppError) => ({payload:o})),

  userPopulated:createAction("@app/auth/user-populated",(o:{appId:string,user:IUserPreview|null,token:string|null}) => ({payload:o})),

  autologin:createAction("@app/auth/autologin"),

  signupUser:createAction("@app/auth/signup",(o:Pick<IUserJson,"email">) => ({payload:o})),
  signupUserSuccess:createAction("@app/auth/signup-success",(o:{user:IUserJson,token:string}) => ({payload:o})),
  
  lookupUser:createAction("@app/auth/lookup",(o:Pick<IUserJson,"email">) => ({payload:o})),
  lookupUserSuccess:createAction("@app/auth/lookup-success",(o:boolean) => ({payload:o})),

  verifyUser:createAction("@app/auth/verify",(o:{verification:string}) => ({payload:o})),
  verifyUserSuccess:createAction("@app/auth/verify-success",(o:{user:IUserJson,token:string}) => ({payload:o})),

  registerUser:createAction("@app/auth/register",(o:Partial<IUserJson>) => ({payload:o})),
  registerUserSuccess:createAction("@app/auth/register-success",(s:{user:IUserJson,token:string}) => ({payload:s})),

  registerV2User:createAction("@app/auth/register-v2",(o:Partial<IUserJson>) => ({payload:o})),
  registerV2UserSuccess:createAction("@app/auth/register-v2-success",(s:{user:IUserJson,token:string}) => ({payload:s})),

  setUserPin:createAction("@app/auth/set-pin",(o:{pin:string}) => ({payload:o})),
  setUserPinSuccess:createAction("@app/auth/set-pin-success",(s:{user:IUserJson,token:string}) => ({payload:s})),

  signinRequired:createAction("@app/auth/signin-required"),
  signinUser:createAction("@app/auth/signin",(o:Pick<IUserJson,"email">) => ({payload:o})),
  signinUserSuccess:createAction("@app/auth/signin-success",(o:{user:IUserJson,token:string}) => ({payload:o})),
  
  signinAdminUser:createAction("@app/auth/signin-admin",(o:Pick<IUserJson,"email">) => ({payload:o})),
  signinAdminUserSuccess:createAction("@app/auth/signin-admin-success",(o:{user:IUserJson,token:string}) => ({payload:o})),

  
  loginUser:createAction("@app/auth/login",(o:{emailOrUsername:string;pin:string}) => ({payload:o})),
  loginUserSuccess:createAction("@app/auth/login-success",(s:{user:IUserJson,token:string}) => ({payload:s})),

  loginV2User:createAction("@app/auth/login-v2",(o:{pin:string}) => ({payload:o})),
  loginV2UserSuccess:createAction("@app/auth/login-v2-success",(s:{user:IUserJson,token:string}) => ({payload:s})),
  
  updateUser:createAction("@app/auth/update",(o:Partial<IUserJson>) => ({payload:o})),
  updateUserSuccess:createAction("@app/auth/update-success",(s:{user:IUserJson,token:string}) => ({payload:s})),

  logoutUser:createAction("@app/auth/logout",() => ({payload:true})),
  setUrlAfterLogin:createAction("@app/auth/set-url-after-login",(s:string) => ({payload:s})),

  loginByGoogle:createAction("@app/auth/login-google",(o?:any) => ({payload:o})),
  loginByFacebook:createAction("@app/auth/login-fb",(o?:any) => ({payload:o})),
  registerByGoogle:createAction("@app/auth/register-google",(o?:any) => ({payload:o})),
  registerByFacebook:createAction("@app/auth/register-fb",(o?:any) => ({payload:o})),
};
