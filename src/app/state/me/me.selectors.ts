import {createFeatureSelector, createSelector} from "@ngrx/store";
import { MeFeatureState } from "./me.state";

const me$$ = createFeatureSelector<MeFeatureState>("me");
export const me$ = {
  me$:createSelector(me$$,s => s.user),
  mePreview$:createSelector(me$$,s => ({
    email:s.user?.email||"",
    id:s.user?.id||"",
    img:s.user?.img||"",
    location:s.user?.location||""
  })),
  //settings$:createSelector(me$$,s => s.user?.settings||{}),
  //lang$:createSelector(me$$,s => s.user?.settings.lang||"en"),
};