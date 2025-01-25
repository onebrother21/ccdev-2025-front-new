import {createFeatureSelector,createSelector} from "@ngrx/store";
import { NavigationFeatureState } from "./navigation.state";

const navigation$$ = createFeatureSelector<NavigationFeatureState>("navigation");
export const navigation$ = {
  history$:createSelector(navigation$$,s => s.history),
  requested$:createSelector(navigation$$,s => s.requested),
  popState$:createSelector(navigation$$,s => s.popState),
  menus$:createSelector(navigation$$,s => s.menus),
  current$:createSelector(navigation$$,s => s.history[s.history.length - 1]),
};