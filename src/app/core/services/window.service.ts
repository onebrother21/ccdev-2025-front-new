import { Injectable,Inject, inject, PLATFORM_ID } from "@angular/core";
import { environment as env } from "@env";
//import { APP_CONFIG,AppConfig } from "@config";
import { AppLocalStorageService } from "./local-storage.service";
import { InjectionToken } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

const WINDOW = new InjectionToken<Window>("WINDOW", {
  factory: () => (typeof window !== "undefined" ? window : ({} as Window)),
});

@Injectable({providedIn:"root"})
export class AppWindowService {
  scroll:number = 0;
  get(){return isPlatformBrowser(this.platformId);}
  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    //@Inject(APP_CONFIG) private config:AppConfig,
    private local:AppLocalStorageService,
  ){}
  setName(s:string){if(this.get()) window.name = s;}
  scrollUp(){if(this.get()) window.scrollTo({top:0});}
  refreshVersion(){
    //let version = this.local.load("version");
    //const version = this.config.app.apiVersion;
    //if(!version || version !== apiVersion){this.local.save("version",apiVersion);}
    //const str = `CCTX Sandbox ${version} is running in ${env.name.toLocaleUpperCase()} @ ${new Date().toLocaleString()}`;
    //console.log(str);
    return "123";//version;
  }
  refreshApp(){
    if(this.get()){
      localStorage.clear();
      location.reload();
    }
  }
  recognizeUserDevice(){
    if(!this.get()) return null;
    try {
      const {
        navigator:{
          maxTouchPoints:touchPts,
          cookieEnabled:cookies,
          mimeTypes,
          plugins,
        },
        screen:{width,height},
      } = window;
      const {memory:{jsHeapSizeLimit:memory}} = (window.performance as any);
      const o = {
        memory,
        cookies,
        width,
        height,
        touchPts,
        mimes:mimeTypes.length,
        plugins:plugins.length,
        env:env.name
      };
      //console.log("device",o);]
      this.local.save("appDevice",o);
      return o;
    }
    catch(e){
      console.warn("Active user device unrecognized. Some application features may be affected.");
      this.local.save("appDevice",null);
      return null;
    }
  };
  clearSelection(){
    if(!this.get()) return;
    if((document as any).selection && (document as any).selection.empty) (document as any).selection.empty();
    else if(!!window.getSelection) window.getSelection()?.removeAllRanges();
  }
  geolocate = async () => {
    if(!this.get()) return null;
    const getLocation = window.navigator.geolocation.getCurrentPosition;
    const location = await new Promise((done,reject) => getLocation(done,reject)).catch(e => console.error(e));
    return {location};
  }
}