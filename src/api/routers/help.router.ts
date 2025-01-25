import { inject, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HelpSRsController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class HelpSRsRouter extends InMemApiHandlersService {
  helpSRs = inject(HelpSRsController);
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.endsWith('/helpSRs/all') && method === 'GET':return this.helpSRs.all(req);
        case url.endsWith('/helpSRs') && method === 'POST':return this.helpSRs.create(req);
        case url.match(/\/helpSRs\/q\?/) && method === 'GET':return this.helpSRs.query(req,"q?");
        case url.match(/\/helpSRs\/t\?/) && method === 'GET':return this.helpSRs.search(req,"t?");
        case url.match(/\/helpSRs\/\w+$/) && method === 'GET':return this.helpSRs.fetch(req);
        case url.match(/\/helpSRs\/\w+$/) && method === 'PUT':return this.helpSRs.update(req);
        case url.match(/\/helpSRs\/\w+$/) && method === 'DELETE':return this.helpSRs.remove(req);
        //case url.match(/\/helpSRs\/\w+\/activity/) && method === 'POST':return this.helpSRs.saveActivity(req);
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}