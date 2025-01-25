import { Injectable,Inject,PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn:"root"})
export class AppLocalStorageService {
  get isBrowser(){return isPlatformBrowser(this.platformId);};
  constructor(@Inject(PLATFORM_ID) private platformId:Object){}
  _get(s:string){
    const str = this.isBrowser?localStorage.getItem(s):null;
    const obj = JSON.parse(str||"null");
    return obj;
  }
  _set<T>(s:string,o?:T){if(this.isBrowser) localStorage.setItem(s,JSON.stringify(o));}
  _del(s:string){if(this.isBrowser) localStorage.removeItem(s);}
  load = this._get;
  save = this._set;
  remove = this._del;
  clear = this._del;
}