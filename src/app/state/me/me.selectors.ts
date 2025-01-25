import {createFeatureSelector, createSelector} from "@ngrx/store";
import { MeFeatureState } from "./me.state";
import { UserJson } from "./user.models";

const me$$ = createFeatureSelector<MeFeatureState>("me");
export const me$ = {
  me$:createSelector(me$$,s => s.user),
  mePreview$:createSelector(me$$,s => ({
    username:s.user?.username||"",
    email:s.user?.email||"",
    _id:s.user?._id||"",
    img:s.user?.img||"",
    location:s.user?.location||""
  })),
  //settings$:createSelector(me$$,s => s.user?.settings||{}),
  //lang$:createSelector(me$$,s => s.user?.settings.lang||"en"),
};