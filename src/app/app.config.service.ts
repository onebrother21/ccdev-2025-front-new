import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env';
import { AppLocalStorageService } from 'core';
import { CommonUtils } from '@common';
import { initialDb } from '@api';
import { lastValueFrom, of, tap } from 'rxjs';

//import { Configuration } from './configuration';
interface Configuration {
  a:string,
  b:string    
  useInMemApi:boolean;
}

@Injectable()
export class AppConfigurationService {
  private local = inject(AppLocalStorageService);
  private readonly configUrlPath: string = 'Home/Configuration';
  private configData: Partial<Configuration> = {};
  private configuration:Configuration = {
    a:"ok cool",b:"big dumdum",useInMemApi:true
  };
  constructor(
    private http: HttpClient,
  ){}
  private loadInMemApiDb(){
    const db = this.local.load("appDb");
    const emptyDb = !db || CommonUtils.isEmpty(db);
    if(emptyDb) this.local.save("appDb",initialDb);
  }
  private loadConfigurationData() {
    return lastValueFrom(of(this.configuration).pipe(
      tap(o => o.useInMemApi?this.loadInMemApiDb():null),
      //tap(o => console.log(o))
    ));
    /*
    this.http
    .get<Configuration>(`${env.apiUrl}${this.configUrlPath}`)
    .subscribe((result:any) => {
      this.configData = {
        a: result["test1ServiceUrl"],
        b: result["test2ServiceUrl"]        
      }
    });
    */
  }
  load = this.loadConfigurationData;
  get config(): Configuration {
    return this.configData as any;
  }
}
export function AppConfigurationFactory(configService: AppConfigurationService) {
  return () => configService.load();
}