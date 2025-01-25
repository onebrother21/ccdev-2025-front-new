
import { RouterReducerState,routerReducer } from "@ngrx/router-store";
import { ActionReducerMap,createFeatureSelector,createSelector } from "@ngrx/store";
import { AppRoute } from "@types";

import * as App from "./app";
import * as Navigation from "./navigation";
import * as Me from "./me";
import * as Auth from "./auth";
/*
import * as Ui from "./ui";
import * as Posts from "./posts";
import * as Cases from "./cases";
import * as PiMia from "./pi-mia";
import * as JPMoney from "./jpmoney";
import * as Help from "./help";

import * as Admin from "./features/admin";
import * as AdminPostActivity from "./features/admin-post-activity";
import * as Fyrewyre from "./features/fyre";
import * as Swift from "./features/swift";
import * as SwiftBudget from "./features/swift-budget";
import * as SwiftBudgets from "./features/swift-budgets";
*/

export type RouterState = RouterReducerState<AppRoute>;
const router$$ = createFeatureSelector<RouterState>("router");
export const router$ = {
  router$:router$$,
  route$:createSelector(router$$,s => s?s.state:{url:"/"}),
};

export type AllActions = {
  app:typeof App.AppActions;
  nav:typeof Navigation.NavigationActions;
  me:typeof Me.MeActions;
  auth:typeof Auth.AuthenticationActions;
  /*
  ui:typeof Ui.UiActions;
  posts:typeof Posts.PostsActions;
  cases:typeof Cases.CasesActions;
  pimia:typeof PiMia.PiMiaCaseActions;
  jpmoney:typeof JPMoney.JPMoneyPokerPlanActions;
  help:typeof Help.HelpSRActions;
  
  admin:typeof Admin.AdminActions;
  adminActivity:typeof AdminPostActivity.AdminPostActivityActions;
  fyreSensors:typeof Fyrewyre.SensorsActions;
  fyreLattices:typeof Fyrewyre.LatticesActions;
  swift:typeof Swift.SwiftActions;
  swiftBudget:typeof SwiftBudget.SwiftBudgetActions;
  swiftBudgets:typeof SwiftBudgets.SwiftBudgetsActions;
  */
};
export const AllActions:AllActions = {
  app:App.AppActions,
  nav:Navigation.NavigationActions,
  me:Me.MeActions,
  auth:Auth.AuthenticationActions,
  /*
  ui:Ui.UiActions,
  posts:Posts.PostsActions,
  cases:Cases.CasesActions,
  pimia:PiMia.PiMiaCaseActions,
  jpmoney:JPMoney.JPMoneyPokerPlanActions,
  help:Help.HelpSRActions,
  
  admin:Admin.AdminActions,
  adminActivity:AdminPostActivity.AdminPostActivityActions,
  fyreSensors:Fyrewyre.SensorsActions,
  fyreLattices:Fyrewyre.LatticesActions,
  swift:Swift.SwiftActions,
  swiftBudget:SwiftBudget.SwiftBudgetActions,
  swiftBudgets:SwiftBudgets.SwiftBudgetsActions,
  */
};
export type AllSelectors = {
  router:typeof router$;
  app:typeof App.app$;
  nav:typeof Navigation.navigation$;
  me:typeof Me.me$;
  auth:typeof Auth.auth$;
  /*
  ui:typeof Ui.ui$;
  posts:typeof Posts.posts$;
  cases:typeof Cases.cases$;
  pimia:typeof PiMia.pimia$;
  jpmoney:typeof JPMoney.jpmoney$;
  help:typeof Help.help$;
  /*
  admin:typeof Admin.admin$;
  adminActivity:typeof AdminPostActivity.adminActivity$;
  fyreSensors:typeof Fyrewyre.sensors$;
  fyreLattices:typeof Fyrewyre.lattices$;
  swift:typeof Swift.swift$;
  swiftBudget:typeof SwiftBudget.swiftBudget$;
  swiftBudgets:typeof SwiftBudgets.swiftBudgets$;
  */
};
export const AllSelectors:AllSelectors = {
  router:router$,
  app:App.app$,
  nav:Navigation.navigation$,
  me:Me.me$,
  auth:Auth.auth$,
  /*
  ui:Ui.ui$,
  posts:Posts.posts$,
  cases:Cases.cases$,
  pimia:PiMia.pimia$,
  jpmoney:JPMoney.jpmoney$,
  help:Help.help$,
  /*
  admin:Admin.admin$,
  adminActivity:AdminPostActivity.adminActivity$,
  fyreSensors:Fyrewyre.sensors$,
  fyreLattices:Fyrewyre.lattices$,
  swift:Swift.swift$,
  swiftBudget:SwiftBudget.swiftBudget$,
  swiftBudgets:SwiftBudgets.swiftBudgets$,
  */
};
export interface AppState {
  router:RouterState;
  app:App.AppFeatureState;
  navigation:Navigation.NavigationFeatureState;
  me:Me.MeFeatureState;
  auth:Auth.AuthFeatureState;
  /*
  ui:Ui.UiFeatureState;
  posts:Posts.PostsFeatureState;
  cases:Cases.CasesFeatureState;
  pimia:PiMia.PiMiaFeatureState;
  jpmoney:JPMoney.JPMoneyFeatureState;
  help:Help.HelpFeatureState;
  /*
  admin:Admin.AdminFeatureState;
  adminActivity:AdminPostActivity.AdminPostActivityFeatureState;
  fyreSensors:Fyrewyre.SensorsFeatureState;
  fyreLattices:Fyrewyre.LatticesFeatureState;
  swift:Swift.SwiftFeatureState;
  swiftBudget:SwiftBudget.SwiftBudgetFeatureState;
  swiftBudgets:SwiftBudgets.SwiftBudgetsFeatureState;
  */
}
export const initialAppState:AppState = {
  router:{state:{url:"/"} as AppRoute,navigationId:-1},
  app:App.initializeApp(),
  navigation:Navigation.initializeNavigation(),
  me:Me.initializeMe(),
  auth:Auth.initializeAuth(),
  /*
  ui:Ui.initializeUi(),
  posts:Posts.initializePosts(),
  cases:Cases.initializeCases(),
  pimia:PiMia.initializePiMia(),
  jpmoney:JPMoney.initializeJPMoney(),
  help:Help.initializeHelp(),
  /*
  admin:Admin.initializeAdmin(),
  adminActivity:AdminPostActivity.initializeAdminPostActivity(),
  fyreSensors:Fyrewyre.initializeSensors(),
  fyreLattices:Fyrewyre.initializeLattices(),
  swift:Swift.initializeSwift(),
  swiftBudget:SwiftBudget.initializeSwiftBudget(),
  swiftBudgets:SwiftBudgets.initializeSwiftBudgets(),
  */
};
export const REDUCERS = {
  router:routerReducer,
  app:App.appReducer,
  navigation:Navigation.navigationReducer,
  me:Me.meReducer,
  auth:Auth.authReducer,
  /*
  ui:Ui.uiReducer,
  posts:Posts.postsReducer,
  cases:Cases.casesReducer,
  pimia:PiMia.piMiaReducer,
  jpmoney:JPMoney.jpmoneyReducer,
  help:Help.helpReducer,
  /*
  admin:Admin.adminReducer,
  adminActivity:AdminPostActivity.adminActivityReducer,
  fyreSensors:Fyrewyre.sensorsReducer,
  fyreLattices:Fyrewyre.latticesReducer,
  swift:Swift.swiftReducer,
  swiftBudget:SwiftBudget.swiftBudgetReducer,
  swiftBudgets:SwiftBudgets.swiftBudgetsReducer,
  */
} as ActionReducerMap<AppState>;
export const EFFECTS = [
  Navigation.NavigationEffects,
  Me.MeEffects,
  Auth.AuthenticationEffects,
  App.AppEffects,
  /*
  Ui.UiEffects,
  Posts.PostsEffects,
  Cases.CasesEffects,
  PiMia.PiMiaCasesEffects,
  JPMoney.JPMoneyPokerPlansEffects,
  Help.HelpSRsEffects,
  /*
  Admin.AdminEffects,
  AdminPostActivity.AdminPostActivityEffects,
  Fyrewyre.SensorsEffects,
  Fyrewyre.LatticesEffects,
  Swift.SwiftEffects,
  SwiftBudget.SwiftBudgetEffects,
  SwiftBudgets.SwiftBudgetsEffects,
  */
];


export * from "./app";
export * from "./navigation";
export * from "./me";
export * from "./auth";

/*
export * from "./ui";
export * from "./posts";
export * from "./cases";
export * from "./pi-mia";
export * from "./jpmoney";
export * from "./help";
*/