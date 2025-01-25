import {
  HttpResponse,
  HttpHeaders,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AppError,CommonUtils as Utils } from "_commoncore/common";
import { Observable,of,catchError } from 'rxjs';

@Injectable({providedIn:"root"})
export class InMemApiHandlersService {
  errors:{[k:string]:(...a:any) => Observable<HttpEvent<AppError|Error>>} = {
    someerror:(error:AppError) => {throw error;},
    fourohfour:(info:any = {}) => {throw new AppError({status:404,msg:'Page not found',code:"ENOTFOUND",info});},
    forbidden:() => {throw new AppError({status:403,msg:'Forbidden',code:"EFORBIDDEN"});},
    unauthorized:() => {throw new AppError({status:401,msg:'Unauthorized',code:"EAUTHORIZED"});},
    existingUser:() => {throw new AppError({
      msg:'This username or email is already taken',
      status:422,
      code:"EEXISTING",
    });},
    userNotFound:() => {throw new AppError({
      msg:'This user does not exist in our records',
      status:404,
      code:"ENOTFOUND",
    });},
    invalidAuth:() => {throw new AppError({
      msg:'This username and password do not match our records',
      status:422,
      code:"EBADAUTH"
    });},
    invalidCode:() => {throw new AppError({
      msg:'This username and verification code do not match our records',
      status:422,
      code:"EBADCODE"
    });},
    jwtExpired:() => {throw new AppError({
      msg:'This authorization is invalid',
      status:422,
      code:"ETKNEXP"
    });},
  };
  e = this.errors;
  ok = (data?:any,status = 200) => {
    const token = data.token || null;
    return of(new HttpResponse({status,body:{token,data,status}}))
    .pipe(catchError(e => this.e["someerror"](new AppError(e))));
  };
  isLoggedIn = (headers:HttpHeaders) => {
    const auth = headers.get('authorization');
    return auth && /Bearer/.test(auth);
  };
  authGuard = (req:HttpRequest<any>,res:any) => !this.isLoggedIn(req?.headers)?this.e["unauthorized"]():this.ok(res);
  paramFromUrl = (url:string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };
  queryFromUrl = (url:string,customSeperator?:string):Record<string,any> => {
    const seperators = ["lookup?","query?","q?"];
    customSeperator?seperators.push(customSeperator):null;
    const seperator = seperators.find(s => url.includes(s));
    //console.log({seperator})
    if(!seperator) return {};
    const urlParts = url.split(seperator);
    const Q1 = urlParts[urlParts.length - 1].split("&");
    const Q2 = Q1.map(q => q.split("="));
    const q = Q2.reduce((m,p) => ({...m,[p[0]]:p[1]}),{}) as Record<string,any>;
    delete q["ts"];
    //console.log(q)
    return q['q']?JSON.parse(q['q']):q;
  };
}