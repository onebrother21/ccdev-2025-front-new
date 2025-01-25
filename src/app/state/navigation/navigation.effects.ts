import { Injectable, InjectionToken, afterNextRender, inject } from '@angular/core';
import { Actions,ofType,createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ROUTER_REQUEST,ROUTER_NAVIGATED } from "@ngrx/router-store";
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { tap,withLatestFrom,map,mergeMap,filter, switchMap } from 'rxjs/operators';

import { AppStateService } from "../app-state.service";
import { LocationStrategy } from '@angular/common';
import { AppAlert } from '@types';
//import { AppWindowService } from '@core';
const WINDOW = new InjectionToken<Window>("WINDOW", {
  factory: () => (typeof window !== "undefined" ? window : ({} as Window)),
});

@Injectable()
export class NavigationEffects {
  popstateSub$:Observable<any> = new Observable();
  onloadSub$:Observable<any> = new Observable();
  constructor(
    private actions$:Actions,
    private app:AppStateService,
    private router:Router,
    private location:LocationStrategy,
  ){
    afterNextRender(() => {
      this.popstateSub$ = fromEvent(window,'popstate');
    });
  }
  go$:Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].go),
    map(o => o.payload),
    tap(o => typeof o === "string"?
    this.router.navigate([o]):
    this.router.navigate([o.url],{queryParams:o.query}))
  ),{dispatch:false});
  back$:Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].back),
    tap(() => this.location.back())
  ),{dispatch:false});
  pageNotFound$:Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].notFound),
    tap(() => this.location.back())
  ),{dispatch:false});
  /*
    map(o => this.app["@"].go({url:"/error",query:{page:o.payload}}))
  ));
  */
  onPopState:Observable<Action> = createEffect(() => this.popstateSub$.pipe(
    withLatestFrom(this.app.router$),
    map(() => this.app["@"].setPopState())
  ));
  onPreNavigation$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_REQUEST),
    withLatestFrom(this.app.router$),
    mergeMap(() => [])
  ),{dispatch:false});
  onPostNavigation$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    withLatestFrom(this.app.route$),
    withLatestFrom(this.app.popState$),
    //withLatestFrom(this.app.scrollY$),
    //withLatestFrom(this.app.ui$),
    //map(([[[[o,{url}],backOrForward],scrollY],ui]) => ),
    map(([[o,{url}],popState]) => ({o,url,popState})),
    mergeMap(({url,popState}) => {
      const actions = [];
      //!ui.authMode?actions.push(this.app["@"].setUrlAfterLogin(url)):null;
      //!ui.leftSidebarCollapsed?actions.push(this.app["@"].toggleLeftSidebar(true)):null;
      //!ui.rightSidebarCollapsed?actions.push(this.app["@"].toggleRightSidebar(true)):null;
      //!popState && scrollY?actions.push(this.app["@"].scrollToTop()):null;
      popState?actions.push(this.app["@"].clearPopState()):null;
      return actions;
    })
  ));
  navAlerts$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].errorInNavState),
    map(o => o.payload),
    map(o => new AppAlert({
      message:o.message,
      title:o.src || "Oops!",
      type:"error",
      duration:1500,
    })),
    //map(o => this.app["@"].showAlert(o))
  ),{dispatch:false});
}