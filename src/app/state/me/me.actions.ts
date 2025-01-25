import { createAction } from "@ngrx/store";
import { User,UserJson } from "./user.models";
import { AppError } from "@types";
import { MeFeatureState } from "./me.state";

export const MeActions = {
  loadMeState:createAction("@app/me/load-state",(o:MeFeatureState) => ({payload:o})),
  errorInMeState:createAction("@app/me/error",(o:AppError) => ({payload:o})),
  
  populateMe:createAction("@app/me/populate"),
  saveMe:createAction("@app/me/save",(o:UserJson|null) => ({payload:o})),
  updateMe:createAction('@app/me/update',(o:Partial<User>) => ({payload:o})),
};