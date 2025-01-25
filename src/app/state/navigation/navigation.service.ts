import { Injectable } from "@angular/core";
import { Router,ActivationEnd } from "@angular/router";
import { filter,withLatestFrom,tap } from "rxjs/operators";
import { AppStateService } from '../app-state.service';

@Injectable({providedIn:"root"})
export class NavigationService {
  constructor(private router:Router,private app:AppStateService){/* this.listenToRouter(); */}
  listenToRouter(){
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      withLatestFrom(this.app.route$),
      tap(([event,route]) => console.log("before resolve",route.url)));
  }
  get404Navigation(url:string){
    return {
      url:`/${url.split("/")[0]}/error`,
      queryParams:{url:url.split("/").slice(1).join("/")}
    };
  }
  getPageTitle(url:string){
    console.log(url);
    const parts = url.split("/"),s = parts[parts.length - 1];
    switch(s){
      default:return "";
    }
  }
}