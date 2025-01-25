import { Injectable, inject } from '@angular/core';
import { environment as env } from '@env';
import { AppHttpService, AppLocalStorageService } from '@core';
import { of } from 'rxjs';
import { IUserJson } from '@types';

@Injectable({providedIn:'root'})
export class MeService {
  url = `${env.apiUrlLive}/users`;
  local = inject(AppLocalStorageService);
  http = inject(AppHttpService);
  update(id:string,o:Partial<IUserJson>){return this.http.put<IUserJson>(`${this.url}/${id}`,o);}
  populate(){
    const data = this.local.load("appUser");
    const token = this.local.load("authToken");
    return of({data,token});
  }
  save(o:IUserJson|null){this.local.save("appUser",o);}
  clear(){this.local.clear("appUser");}
}
