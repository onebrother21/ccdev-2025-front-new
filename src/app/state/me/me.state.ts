import { IUserJson,Nullable } from "@types";
import { CommonState,initializeCommonState } from "../common.state";

export interface MeFeatureState extends CommonState {
  user:Nullable<IUserJson>;
};
export const initializeMe = ():MeFeatureState => ({
  ...initializeCommonState(),
  user:null,
});