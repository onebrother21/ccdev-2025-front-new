import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, afterNextRender } from "@angular/core";
import { ScriptModel } from "@types";
import { BehaviorSubject,Subject,of,switchMap,filter } from "rxjs";

@Injectable({providedIn:"root"})
export class ScriptLoaderService {
  scriptCt = 0;
  scripts_:BehaviorSubject<ScriptModel[]> = new BehaviorSubject<ScriptModel[]>([]);
  scripts = this.scripts_.asObservable();
  destroy$: Subject<boolean> = new Subject<boolean>();
  isBrowser;
  constructor(@Inject(PLATFORM_ID) private platformId:Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  public load(scripts:ScriptModel[]){
    const errors:ScriptModel[] = [];
    const loaded:ScriptModel[] = [];
    let i = 0;
    const addScripts = () => {
      if(this.isBrowser) for(let i = 0,l = scripts.length;i<l;i++) {
        const script = scripts[i];
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script.src;
        scriptElement.async = !!script.async;
        scriptElement.id = script.name;
        scriptElement.charset = 'utf-8';
        scriptElement.onload = () => {
          //console.log("loaded",script.name);
          loaded.push(script);
          this.scripts_.next([...this.scripts_.getValue(),script]);
        };
        scriptElement.onerror = (ev:any) => {
          //console.log("errors",script.name);
          errors.push(script);
          this.scripts_.next([...this.scripts_.getValue(),script]);
        };
        document.body.appendChild(scriptElement);
      }
    };
    addScripts();
    return this.scripts.pipe(filter(o => o.length == scripts.length));//,tap(() => console.log({loaded,errors}))))
  }
}