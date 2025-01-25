import { Injectable,inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable,of,delay,mergeMap,materialize,dematerialize,catchError,throwError,tap } from 'rxjs';
import { environment as env } from "@env";
import { MainApiRouter } from './main';
//import { APP_CONFIG,AppConfig } from "@config";

@Injectable()
export class InMemApiProvider implements HttpInterceptor {
  router = inject(MainApiRouter);
  constructor(){
    //const version = this.config.app.apiVersion;
    console.log(`In-Memory Api is running in ${env.name.toLocaleUpperCase()} @ ${new Date().toLocaleString()}`);
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    return of(req)
    .pipe(
      mergeMap(req => !new RegExp(env.apiUrl).test(req.url)?
        next.handle(req):
        of(req).pipe(
          tap(req => console.log(req.url)),
          materialize(),
          delay(600),
          dematerialize(),
          mergeMap(this.router.main),
        )
      ),
      catchError(err => this.handleHttpClientError(err)),
    );
  }
  handleHttpClientError(err:any){
    if (err instanceof HttpErrorResponse) {
      // Handle HTTP errors
      if (err.status === 401) {
        // Specific handling for unauthorized errors         
        console.error('Unauthorized request:', err);
        // You might trigger a re-authentication flow or redirect the user here
      }
      else {
        // Handle other HTTP error codes
        console.error('HTTP: ',err.status,err);
      }
    }
    else {
      // Handle non-HTTP errors
      console.error('An error occurred:',err);
    }
    // Re-throw the error to propagate it further
    return throwError(() => err); 
  }
}
export {initialDb} from "./db";