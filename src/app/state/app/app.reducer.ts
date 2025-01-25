import { Action, createReducer, on } from "@ngrx/store";
import { AppActions as APP } from "./app.actions";
import { AppFeatureState,initializeApp } from "./app.state";
import { AppError,CommonUtils,CommonUtils as Utils } from "types";

const initialState = initializeApp();
const reducer = createReducer(
  initialState,
  on(APP.loadAppState,(s_,{payload:s}) => ({...CommonUtils.merge(s_,s),scripts:s_.scripts})),
  on(APP.errorInApp,(s,{payload:error}) => ({ ...s,error:formatError(error),loading:false})),
  on(APP.loadExternalScripts,s => ({ ...s,scriptsLoaded:false})),
  on(APP.loadExternalScriptsSuccess,s => ({ ...s,scriptsLoaded:true})),
  on(APP.refreshVersionSuccess,(s,{payload:version}) => ({ ...s,version})),
  on(APP.recognizeDeviceSuccess,(s,{payload:device}) => ({ ...s,device})),
  on(APP.isMobile,(s,{payload:isMobile}) => ({ ...s,isMobile})),
  on(APP.setScope,(s,{payload:scope}) => ({ ...s,scope})),
  on(APP.lookupAddressSuccess,(s,{payload:addr}) => ({ ...s,addr})),
);

export function appReducer(s:AppFeatureState|undefined,action:Action) {return reducer(s,action);}
const formatError = (e:Error|AppError) => e instanceof AppError?e.json():e;