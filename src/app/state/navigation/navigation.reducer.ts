import { Action, createReducer, on } from "@ngrx/store";
import { routerNavigatedAction,routerNavigationAction, routerRequestAction } from "@ngrx/router-store";
import { NavigationActions as NAV } from "./navigation.actions";
import { NavigationFeatureState,initializeNavigation } from "./navigation.state";
import { AppError,AppEntity } from "@types";
import { CommonUtils } from "app/utils";

const initialState = initializeNavigation();
const reducer = createReducer(
  initialState,
  on(NAV.loadNavigationState,(s_,{payload:s}) => CommonUtils.merge(s_,s)),
  on(NAV.setPopState,s => ({ ...s,popState:true})),
  on(NAV.clearPopState,s => ({ ...s,popState:false})),
  on(NAV.selectNavItem,(s,{payload:menuItem}) => {
    const menus =  {...s.menus};
    const k = Object.keys(menuItem)[0];
    const i = menuItem[k];
    const items = menus[k].items.map((m,i_) => ({...m,active:i == i_?true:false}));
    menus[k] = {...menus[k],items,active:i};
    return {...s,menus};
  }),
  on(NAV.toggleDisabled,(s,{payload:menuItem}) => {
    const menus =  {...s.menus};
    const k = Object.keys(menuItem)[0];
    const i = menuItem[k];
    const items = [...menus[k].items];
    const item = {...items[i],disabled:!items[i].disabled};
    items[i] = item;
    menus[k] = {...menus[k],items};
    return {...s,menus};
  }),
  on(routerRequestAction,(s,{payload:{routerState:route}}) => ({ ...s,requested:route})),
  on(routerNavigatedAction,(s,{payload:{routerState:route}}) => {
    const history = [...s.history,new AppEntity(route)] as typeof s.history;
    return {
      ...s,
      history,
      requested:undefined,
      loading:false,
      error:null,
    };
  }),
);

export function navigationReducer(s:NavigationFeatureState|undefined,action:Action) {return reducer(s,action);}
const formatError = (e:Error|AppError) => e instanceof AppError?e.json():e;