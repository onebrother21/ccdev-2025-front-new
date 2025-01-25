import { CommonState,Nullable,initializeCommonState } from "@types";
import { AuthTokenPublic,AuthUserPreview } from "./auth.models";

export interface AuthFeatureState extends CommonState {
  user:Nullable<AuthUserPreview>;
  token:Nullable<AuthTokenPublic>;
  urlAfterLogin?:string;
  exists?:boolean;
}
export const initializeAuth = ():AuthFeatureState => ({
  user:null,
  token:null,
  ...initializeCommonState()
});