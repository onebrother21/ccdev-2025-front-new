import { Injectable,Inject,PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {environment as env} from "@env";
//import { AppConfig,APP_CONFIG } from "@config";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable,map,catchError,throwError } from "rxjs";
import { AppLocalStorageService } from "./local-storage.service";
import { AppWindowService } from "./window.service";
import { AppEncryptionService } from "./encryption.service";
import { CommonUtils as Utils } from "utils";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  isBrowser;
  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    //@Inject(APP_CONFIG) private config:AppConfig,
    private local:AppLocalStorageService,
    private win:AppWindowService,
    private encrypter:AppEncryptionService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  useEncryption(){
    const client:any = this.local.load("appDevice");
    switch(true){
      case /dev-in-mem/i.test(client.env):return false;
      default:return true;
    }
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {
    const authtkn = this.local.load("authToken") || "";
    const csrfTkn = this.local.load("csrfToken");
    const client = JSON.stringify(this.local.load("appDevice"));
    const headers = {
      ...!["POST","PUT"].includes(req.method)?{"Content-Type":"application/json"}:null,
      ...authtkn?{"Authorization":`Bearer ${authtkn}`}:null,
      ...csrfTkn?{"x-csrf-token":csrfTkn}:null,
      ...client?{"XAPP-CLIENT":client}:null,
      /*
      ...this.config.app?{
        //"CCTX-PLAYGROUND-CLIENT-ID":this.config.app.apiClientId,
        //"CCTX-PLAYGROUND-CLIENT-KEY":this.config.app.apiClientKey,
      }:null,
      */
    };
    const data = this.useEncryption()?this.encrypter.encrypt(req.body):req.body;
    const body = req.body?{data}:undefined;
    const authReq = req.clone({body,setHeaders:headers,withCredentials:true});
    this.local.save("lastHttpCall",authReq);
    //console.log("http request ready");
    return next.handle(authReq).pipe(
      map((res:HttpEvent<any>) => {
        if(res instanceof HttpResponse && res.body){
          res.body.token?this.local.save("authToken",res.body.token):null;
          res.body.csrfToken?this.local.save("crsfToken",res.body.csrfToken):null;
          if(res.body.data && this.useEncryption()){res.body.data = JSON.parse(this.encrypter.decrypt(res.body.data));}
        }
        return res;
      }),
      catchError(err => this.handleHttpClientError(err)));
  }
  handleHttpClientError(error:any){
    //console.error(error.status||500,error);
    return throwError(() => error);
  }
}