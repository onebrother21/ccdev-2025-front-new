import { Injectable,Inject } from '@angular/core';
import { Actions,createEffect,ofType,ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable,of } from "rxjs";
import { map,mergeMap,tap,filter,catchError,withLatestFrom, switchMap, delay } from 'rxjs/operators';
import { environment as env } from '@env';
//import { APP_CONFIG,AppConfig } from '@config';
import {
  AppHttpService,
  AppLocalStorageService,
  AppWindowService,
  GeolocationService,
  ScriptLoaderService,
} from '@core';
import { AppError } from '@types';
import { CommonUtils as Utils } from '@utils';
import { AppStateService } from '../app-state.service';
import { AppService } from './app.service';
//import { UiService } from '../../state-old/services';

@Injectable()
export class AppEffects {
  currentAction = "";
  runErrorAction = (e:any) => this.app["@"].errorInApp(new AppError(e,this.currentAction));
  constructor(
    //@Inject(APP_CONFIG) private config:AppConfig,
    private actions$:Actions,
    private app:AppStateService,
    private appF:AppService,
    private local:AppLocalStorageService,
    private http:AppHttpService,
    private win:AppWindowService,
    private scriptLoader:ScriptLoaderService,
    private geoLocation:GeolocationService,
    //private ui:UiService,
  ){}
  onInit$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => this.local.load("appState") || {} as any),
    mergeMap(appState => [
      /*
      this.app["@"].loadNavigationState(appState.nav),
      this.app["@"].loadUiState(appState.ui),
      this.app["@"].loadPostsState(appState.posts),
      this.app["@"].loadCasesState(appState.cases),
      this.app["@"].loadJPMoneyState(appState.jpmoney),
      this.app["@"].loadPiMiaState(appState.pimia),
      this.app["@"].loadHelpState(appState.help),
      */
      this.app["@"].loadMeState(appState.me),
      this.app["@"].loadAuthState(appState.auth),
      this.app["@"].loadAppState(appState.app),
      this.app["@"].loadAppStateSuccess(),
    ]),
  ));
  onAppState$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].loadAppStateSuccess),
    tap(o => this.currentAction = o.type),
    mergeMap(() => [
      this.app["@"].loadExternalScripts(),
      this.app["@"].populateMe(),
    ])
    //map(() => this.app["@"].clearAlert()),
  ));
  loadScripts$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].loadExternalScripts),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    withLatestFrom(this.app.scripts$),
    mergeMap(([,s]) => this.scriptLoader.load(s).pipe(
      map(o => this.app["@"].loadExternalScriptsSuccess()),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  onLoadScriptsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].loadExternalScriptsSuccess),
    tap(o => this.currentAction = o.type),
    mergeMap(() => [
      this.app["@"].refreshVersion(),
      this.app["@"].recognizeDevice(),
      this.app["@"].connectToBackend(),
      //this.app["@"].closePreloader(1500),
      //this.app["@"].setDarkMode(),
    ])
  ));
  /*
  isMobile$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].setInnerWidth),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    map(n => n < 992),
    map((b:boolean) => this.app["@"].isMobile(b))
  ));
  */
  refreshVersion$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].refreshVersion),
    tap(o => this.currentAction = o.type),
    map(() => this.win.refreshVersion()),
    map(v => this.app["@"].refreshVersionSuccess(v)),
  ));
  recognizeAppDevice$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].recognizeDevice),
    tap(o => this.currentAction = o.type),
    map(() => this.win.recognizeUserDevice()),
    map(o => this.app["@"].recognizeDeviceSuccess({...o,["env"]:env.name}))
  ));
  onConnectToBackend  = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].connectToBackend),
    tap(o => this.currentAction = o.type),
    mergeMap(o => /*this.ui.connectToBackend()*/of((() => {
      //console.log("on backend connection...");
      return {data:true};
    })()).pipe(
      map(({data}) => this.app["@"].connectToBackendSuccess(data)),
      catchError(e => [
        //this.app["@"].error(new AppError(e,o.type))
      ])
    ))
  ));
  refreshAppState:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].refreshAppState),
    tap(o => this.currentAction = o.type),
    tap(() => {
      this.local.clear("appDb");
      this.local.clear("appState");
      this.win.refreshApp();
    }),
  ),{dispatch:false});
  handleErrors$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].errorInApp),
    map(({payload:e}) => ({e,isAppError:e instanceof AppError && e.status && e.status > 399})),
    tap(({e,isAppError}) => isAppError?console.error(`ERROR [${e.status}: ${e.message}] --> ${e.src}`):console.error(e)),
  ),{dispatch:false});
  saveState$ = createEffect(() => this.actions$.pipe(
    map(o => o.type),
    filter(a => !/refresh-app/.test(a)),
    withLatestFrom(this.app.state$),
    tap(([,s]) => this.local.save("appState",s))
  ),{dispatch:false});
  lookupAddress = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].lookupAddress),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.geoLocation.lookupAddress(o).pipe(
      map(data => this.app["@"].lookupAddressSuccess(data)),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  anyAction = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].anyAction),
    map(o => o.payload),
    tap(o => {
      switch(true){
        case o instanceof Error:console.log("action here: ",Utils.getFileInfoFromException(o));break;
        case !!o:console.log("action taken: ",o);break;
        default:{
          try {
            throw new AppError("any action error");
          }
          catch(e:any){
            console.log("action here: ",Utils.getFileInfoFromException(e));
          }
        }
      }
    })
  ),{dispatch:false});
}