import { IUserPreview,Nullable } from "@types";
import { CommonState,initializeCommonState } from "../common.state";

export interface AuthFeatureState extends CommonState {
  user:Nullable<IUserPreview>;
  token:Nullable<string>;
  urlAfterLogin?:string;
  exists?:boolean;
}
export const initializeAuth = ():AuthFeatureState => ({
  user:null,
  token:null,
  ...initializeCommonState()
});