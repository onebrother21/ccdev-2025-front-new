import { createAction } from "@ngrx/store";
import { AppError,IUserJson } from "@types";
import { MeFeatureState } from "./me.state";

export const MeActions = {
  loadMeState:createAction("@app/me/load-state",(o:MeFeatureState) => ({payload:o})),
  errorInMeState:createAction("@app/me/error",(o:AppError) => ({payload:o})),
  
  populateMe:createAction("@app/me/populate"),
  saveMe:createAction("@app/me/save",(o:IUserJson|null) => ({payload:o})),
  updateMe:createAction('@app/me/update',(o:Partial<IUserJson>) => ({payload:o})),
};