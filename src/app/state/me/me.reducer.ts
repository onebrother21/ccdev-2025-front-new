import { Action, createReducer, on } from "@ngrx/store";
import { MeActions as ME } from "./me.actions";
import { MeFeatureState,initializeMe } from "./me.state";
import { AppError } from "@types";
import { CommonUtils } from "@utils";

const initialState = initializeMe();
const reducer = createReducer(
  initialState,
  on(ME.loadMeState,(s_,{payload:s}) => CommonUtils.merge(s_,s)),
  on(ME.updateMe,s => ({...s,loading:true})),
  on(ME.saveMe,(s,{payload:user}) => ({...s,user,loading:false})),
);

export function meReducer(s:MeFeatureState|undefined,action:Action) {return reducer(s,action);}
const formetError = (e:Error|AppError) => e instanceof AppError?e.json():e;