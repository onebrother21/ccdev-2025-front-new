import {createFeatureSelector,createSelector} from "@ngrx/store";
import { AppFeatureState } from "./app.state";

const app$$ = createFeatureSelector<AppFeatureState>("app");
export const app$ = {
  errorInApp$:createSelector(app$$,s => s.error),
  appId$:createSelector(app$$,s => s.id),
  loading$:createSelector(app$$,s => s.loading),
  scripts$:createSelector(app$$,s => s.scripts),
  scriptsLoaded$:createSelector(app$$,s => !!s.scriptsLoaded),
  version$:createSelector(app$$,s => s.version),
  device$:createSelector(app$$,s => s.device),
  isMobile$:createSelector(app$$,s => s.isMobile),
  scope$:createSelector(app$$,s => s.scope),
  addressLookup$:createSelector(app$$,s => s.addr),
};