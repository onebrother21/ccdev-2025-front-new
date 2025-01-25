import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { mergeMap,map,tap,catchError,withLatestFrom, filter, switchMap } from "rxjs/operators";

import { AppAlert, AppError } from '@types';
import { AuthenticationService } from "./auth.service";
import { AppStateService } from "../app-state.service";

@Injectable()
export class AuthenticationEffects {
  currentAction = "";
  runErrorAction = (e:any) => this.app["@"].errorInAuthState(new AppError(e,this.currentAction));
  constructor(
    private actions$:Actions,
    private auth:AuthenticationService,
    private app:AppStateService,
  ){}
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].signupUser),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.auth.signupUser(o).pipe(
      tap(({token,data:user}) => console.log(user)),
      mergeMap(({token,data:user}) => [
        this.app["@"].signupUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  lookup$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].lookupUser),
    map(o => o.payload),
    mergeMap(q => this.auth.lookupUser(q).pipe(
      map(({data:{exists}}) => this.app["@"].lookupUserSuccess(exists)),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  verify$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].verifyUser),
    tap(o => this.currentAction = o.type),
    withLatestFrom(this.app.authId$),
    map(([{payload:{verification}},email]) => ({email,verification})),
    mergeMap(o => this.auth.verifyUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].verifyUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  register$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].registerUser),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.auth.registerUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].registerUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  registerV2$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].registerV2User),
    tap(o => this.currentAction = o.type),
    withLatestFrom(this.app.authId$),
    map(([{payload:updates},email]) => ({email,...updates})),
    mergeMap(o => this.auth.registerUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].registerV2UserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  setPin$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].setUserPin),
    tap(o => this.currentAction = o.type),
    withLatestFrom(this.app.authId$),
    map(([{payload:{pin}},emailOrUsername]) => ({emailOrUsername,pin})),
    mergeMap(o => this.auth.setUserPin(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].setUserPinSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));

  signin$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].signinUser),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.auth.signinUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].signinUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  signinAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].signinAdminUser),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.auth.signinAdminUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].signinAdminUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  login$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].loginUser),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    mergeMap(o => this.auth.loginUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].loginUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  loginV2$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].loginV2User),
    tap(o => this.currentAction = o.type),
    map(o => o.payload),
    withLatestFrom(this.app.authId$),
    map(([{pin},username]) => ({username,pin})),
    mergeMap(o => this.auth.loginV2User(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].loginUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));
  autologin$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].autologin),
    tap(o => this.currentAction = o.type),
    withLatestFrom(this.app.authId$),
    withLatestFrom(this.app.authToken$),
    map(([[,o],tkn]) => ({username:o,token:tkn})),
    filter(o => !!(o.username && o.token)),
    mergeMap(() => this.auth.autologinUser().pipe(
      map(({token,data:user}) => this.app["@"].loginUserSuccess({user,token})),
      catchError(e => [
        this.runErrorAction(e),
        this.app["@"].logoutUser(),
        this.app["@"].signinRequired()
      ]),
    ))
  ));
  update$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].updateUser),
    tap(o => this.currentAction = o.type),
    withLatestFrom(this.app.authId$),
    map(([{payload:updates},username]) => ({username,updates})),
    mergeMap(o => this.auth.updateUser(o).pipe(
      mergeMap(({token,data:user}) => [
        this.app["@"].updateUserSuccess({user,token}),
        this.app["@"].saveMe(user)
      ]),
      catchError(e => [this.runErrorAction(e)])
    ))
  ));

  onUserPopulated$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].userPopulated),
    map(() => this.app["@"].autologin())
  ));

  signout$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].logoutUser),
    tap(o => this.currentAction = o.type),
    map(() => this.app["@"].saveMe(null))
  ));
  authErrorHandler$ = createEffect(() => this.actions$.pipe(
    ofType(this.app["@"].errorInAuthState),
    map(() => this.app["@"].anyAction({noAuth:true}))
  ));
  authNavigation$ = createEffect(() => this.actions$.pipe(
    filter(o => /auth/.test(o.type)),
    map(o => ({type:o.type,payload:(o as any).payload || {}})),
    withLatestFrom(this.app.authUser$),
    map(([o,user]) => ({...o,user})),
    withLatestFrom(this.app.urlAfterLogin$),
    map(([o,nextUrl]) => ({...o,nextUrl})),
    mergeMap(o => {
      const actions = [] as Action[];
      const auth = o.user;
      switch(o.type){
        case "@app/auth/signup-success":{this.app.go(`/abc123/verify`);break;}
        case "@app/auth/signin-success":{
          //auth.token?actions.push(this.app["@"].autologin()):
          auth && !auth.meta.verified?this.app.go(`/abc123/verify`):
          auth && !auth.meta.registered?this.app.go(`/abc123/register`):
          auth && !auth.meta.reset?this.app.go(`/abc123/set-pin`):
          auth?this.app.go(`/abc123/login`):
          this.app.go(`/en/error`);
          break;
        }
        case "@app/auth/verify-success":{
          //auth.token?actions.push(this.app["@"].autologin()):
          //auth && !auth.meta.verified?this.app.go(`/abc123/verify`):
          auth && !auth.meta.registered?this.app.go(`/abc123/register`):
          auth && !auth.meta.reset?this.app.go(`/abc123/set-pin`):
          auth?this.app.go(`/abc123/login`):
          this.app.go(`/en/error`);
          break;
        }
        case "@app/auth/register-success":
        case "@app/auth/set-pin-success":
        case "@app/auth/login-success":{this.app.go(`/admin`);break;}

        case "@app/auth/logout":{this.app.go(`/abc123/login`);break;}
        case "@app/auth/signin-required":{this.app.go(`/abc123/login`);break;}
        /*
        case "@app/auth/signup-success":{this.app.go(`/abc123/verify`);break;}
        
        case "@app/auth/login-required":{this.app.go(`/abc123/login`);break;}
        case "@app/auth/verify-success":{this.app.go(`/abc123/register`);break;}
        case "@app/auth/login-success":{this.app.go(o.nextUrl||`/dash`);break;}
        //case "@app/auth/signout-success":{this.app.go(`/${auth.meta.scope}`);break;}
        */
      }
      return actions;
    })
  ));
  authAlerts$ = createEffect(() => this.actions$.pipe(
    ofType(
      this.app["@"].logoutUser,
      this.app["@"].signupUserSuccess,
      this.app["@"].verifyUserSuccess,
      this.app["@"].registerUserSuccess,
      this.app["@"].setUserPinSuccess,
      //this.app["@"].signinUserSuccess,
      this.app["@"].loginUserSuccess,
      this.app["@"].updateUserSuccess,
      this.app["@"].errorInAuthForm,
      this.app["@"].errorInAuthState,
    ),
    map(({type,payload:o}) => {
      switch(type){
        case "@app/auth/logout":{
          return new AppAlert({
            //message:"See you next time!"+o.username,
            title:"Signout complete!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/signup-success":{
          return new AppAlert({
            message:"Welcome friend",
            title:"Signup Success!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/verify-success":{
          return new AppAlert({
            message:"Thank you. Let's continue",
            title:"Email Verified!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/register-success":{
          return new AppAlert({
            message:"Welcome "+o.user.username,
            title:"Registration Success!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/set-pin-success":{
          return new AppAlert({
            message:"You're all set!",
            title:"Registration Complete!",
            type:"success",
            duration:2000
          });
        }
        /*
        case "@app/auth/signin-success":{
          return new AppAlert({
            message:"Thank you. Let's login",
            title:"Signin Success!",
            type:"success",
            duration:2000
          });
        }
        */
        case "@app/auth/login-success":{
          return new AppAlert({
            message:"Welcome back "+o.user.username,
            title:"Login Success!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/update-success":{
          return new AppAlert({
            message:"You're all set",
            title:"Update Success!",
            type:"success",
            duration:2000
          });
        }
        case "@app/auth/form/error":{
          return new AppAlert({
            message:typeof o === "string"?o:o.message,
            title:"Yeah your form is wrong!",
            type:"error",
            duration:2000
          });
        }
        case "@app/auth/error":{
          return new AppAlert({
            message:o.message,
            title:"Login Failure!",
            type:"error",
            duration:2000
          });
        }
      }
    }),
    //map(o => this.app["@"].showAlert(o))
  ),{dispatch:false});
}