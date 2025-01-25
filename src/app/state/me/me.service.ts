import { Injectable, inject } from '@angular/core';
import { environment as env } from '@env';
import { AppHttpService, AppLocalStorageService } from 'core';
import { User,UserJson } from './user.models';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class MeService {
  url = `${env.apiUrl}/users`;
  local = inject(AppLocalStorageService);
  http = inject(AppHttpService);
  update(id:string,o:Partial<User>){return this.http.put<UserJson>(`${this.url}/${id}`,o);}
  populate(){
    const data = this.local.load("appUser");
    const token = this.local.load("authToken");
    return of({data,token});
  }
  save(o:UserJson|null){this.local.save("appUser",o);}
  clear(){this.local.clear("appUser");}
}
