import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthFeatureState} from "./auth.state";
import { app$ } from "../app";

export const auth$$ = createFeatureSelector<AuthFeatureState>("auth");
export const auth$ = {
  authLoading$:createSelector(auth$$,s => s.loading),
  errorInAuth$:createSelector(auth$$,s => s.error),
  authUser$:createSelector(auth$$,s => s.user),
  authId$:createSelector(auth$$,s => s.user?.username || s.user?.email || ""),
  authToken$:createSelector(auth$$,s => s.token),
  authed$:createSelector(auth$$,s => !!s.token && s.token.type == "auth"),
  authExists$:createSelector(auth$$,s => s.exists),
  authNotExist$:createSelector(auth$$,s => !s.exists),
  urlAfterLogin$:createSelector(auth$$,s => s.urlAfterLogin),
};