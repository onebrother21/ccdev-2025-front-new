import { Injectable } from "@angular/core";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable,of } from "rxjs";
import { mergeMap,map,tap,catchError,withLatestFrom,filter, switchMap } from "rxjs/operators";

import { MeService } from "./me.service";
import { AppStateService } from "../app-state.service";
import { AppAlert,AppError } from "@types";

@Injectable()
export class MeEffects {
  currentAction = "";
  runErrorAction = (e:any) => this.app["@"].errorInApp(new AppError(e,this.currentAction));
  constructor(
    private actions$:Actions,
    private user:MeService,
    private app:AppStateService,
  ){}
  onPopulate$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].populateMe),
    withLatestFrom(this.app.appId$),
    switchMap(([,appId]) => this.user.populate().pipe(
      mergeMap(({token,data}) => [
        this.app["@"].userPopulated({appId,user:data,token}),
        //this.app["@"].lo
        this.app["@"].saveMe(data),
      ])
    ))
  ));
  onSave$:Observable<void> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].saveMe),
    map(o => o.payload),
    map(o => this.user.save(o)),
    //tap(o => console.log(o)),
    //map(() => this.app["@"].cl())
  ),{dispatch:false});
  onUpdate$:Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].updateMe),
    map(o => o.payload),
    map(o => this.app["@"].updateUser(o))
  ));
  meAlerts$:Observable<AppAlert> = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].errorInMeState),
    map(({type,payload:o}) => {
      switch(type){
        case "@app/me/error":{
          return new AppAlert({
            message:o.message,
            title:o.src || "Oops!",
            type:"error",
            duration:1500,
          });
        }
        default:return {} as AppAlert
      }
    }),
    //map(o => this.app["@"].showAlert(o))
  ),{dispatch:false});
}