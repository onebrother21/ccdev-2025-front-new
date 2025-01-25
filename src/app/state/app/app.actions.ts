import { createAction } from "@ngrx/store";
import { AppError,ScriptModel } from "@types";
import { AppFeatureState } from "./app.state";

export const AppActions = {
  loadAppState:createAction("@app/app/load-state",(o:AppFeatureState) => ({payload:o})),
  loadAppStateSuccess:createAction("@app/app/load-state-success"),

  errorInApp:createAction("@app/app/error",(o:AppError) => ({payload:o})),

  refreshApp:createAction("@app/app/refresh-app"),
  refreshAppState:createAction("@app/app/refresh-app-state"),

  loadExternalScripts:createAction("@app/app/load-scripts",(o?:ScriptModel[]) => ({payload:o})),
  loadExternalScriptsSuccess:createAction("@app/app/load-scripts-success"),

  recognizeDevice:createAction("@app/app/recognize-device"),
  recognizeDeviceSuccess:createAction("@app/app/recognize-device-success",(o:any) => ({payload:o})),
  isMobile:createAction("@app/app/is-mobile",(o:boolean) => ({payload:o})),

  refreshVersion:createAction("@app/app/refresh-version"),
  refreshVersionSuccess:createAction("@app/app/refresh-version-success",(o:string) => ({payload:o})),

  setScope:createAction("@app/app/set-scope",(o:string) => ({payload:o})),

  connectToBackend:createAction("@app/app/connect-to-backend"),
  connectToBackendSuccess:createAction("@app/app/connect-to-backend-success",(o:any) => ({payload:o})),

  lookupAddress:createAction("@app/app/lookup-address",(o:any) => ({payload:o})),
  lookupAddressSuccess:createAction("@app/app/lookup-address-success",(o:any) => ({payload:o})),

  anyAction:createAction("@app/app/any-action",(o?:any) => ({payload:o})),
};