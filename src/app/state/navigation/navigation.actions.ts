import { createAction } from "@ngrx/store";
import { AppError, AppRoute } from "@types";
import { NavigationFeatureState } from "./navigation.state";

export const NavigationActions = {
  loadNavigationState:createAction("@app/navigation/load-state",(o:NavigationFeatureState) => ({payload:o})),
  errorInNavState:createAction("@app/navigation/error",(o:AppError) => ({payload:o})),

  notFound:createAction("@app/navigation/404",(o:string) => ({payload:o})),
  go:createAction('@app/navigation/go',(o:string|AppRoute) => ({payload:o})),
  back:createAction('@app/navigation/back'),

  setPopState:createAction('@app/navigation/set-pop-state'),
  clearPopState:createAction('@app/navigation/clear-pop-state'),
  
  selectNavItem:createAction("@app/navigation/select-nav-item",(o:Record<string,number>) => ({payload:o})),
  toggleDisabled:createAction("@app/navigation/toggle-disabled",(o:Record<string,number>) => ({payload:o})),
};