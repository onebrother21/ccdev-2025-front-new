import { Action, createReducer, on } from "@ngrx/store";
import { AuthenticationActions as AUTH } from "./auth.actions";
import { AuthFeatureState,initializeAuth } from "./auth.state";
import { AppError, CommonUtils } from "@types";

const initialState = initializeAuth();
const reducer = createReducer(
  initialState,
  on(AUTH.loadAuthState,(s_,{payload:s}) => CommonUtils.merge(s_,s)),
  on(AUTH.errorInAuthState,(s,{payload:error}) => ({...s,error:formatError(error),loading:false})),
  on(AUTH.errorInAuthForm,(s,{payload:error}) => ({...s,error:error as any,loading:false})),
  on(AUTH.setUrlAfterLogin,(s,{payload:urlAfterLogin}) => ({...s,urlAfterLogin})),
  on(AUTH.lookupUserSuccess,(s,{payload:exists}) => ({
    ...s,
    exists,
    error:null,
    loading:false,
  })),
  on(
    AUTH.signupUser,
    AUTH.verifyUser,
    AUTH.registerUser,
    AUTH.setUserPin,
    AUTH.signinUser,
    AUTH.signinAdminUser,
    AUTH.loginUser,
    AUTH.updateUser,s => ({...s,loading:true})),
  on(
    AUTH.userPopulated,
    AUTH.signupUserSuccess,
    AUTH.verifyUserSuccess,
    AUTH.registerUserSuccess,
    AUTH.setUserPinSuccess,
    AUTH.signinUserSuccess,
    AUTH.signinAdminUserSuccess,
    AUTH.loginUserSuccess,
    AUTH.updateUserSuccess,(s,{payload:{user,token}}) => {
    const userPreview = user?{
      _id:user._id,
      email:user.email,
      name:user.name,
      username:user.username||"",
      img:user.img||"",
      location:user.location||"",
      meta:user.meta||{},
      token,
    }:null;
    return {
      ...s,
      error:null,
      loading:false,
      user:userPreview,
      token,
    };
  }),
  on(AUTH.logoutUser,s => ({...s,user:null,token:null})),
);

export function authReducer(s:AuthFeatureState|undefined,action:Action) {return reducer(s,action);}
const formatError = (e:Error|AppError) => e instanceof AppError?e.json(true):e;