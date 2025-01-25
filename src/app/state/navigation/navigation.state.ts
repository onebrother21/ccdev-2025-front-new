import {
  AppRoute,
  AppNavItem
} from "app/types";
import {
  CommonStateWithHistory,
  initializeCommonStateWithHistory,
} from "../common.state";
import { NAV_MENUS } from "./navigation-menus.state";

export interface NavigationFeatureState extends CommonStateWithHistory<AppRoute> {
  requested?:AppRoute;
  popState?:boolean;
  menus:Record<string,{active?:number,items:AppNavItem[]}>;
}
export const initializeNavigation = ():NavigationFeatureState => ({
  ...initializeCommonStateWithHistory(),
  popState:false,
  menus:NAV_MENUS,
});