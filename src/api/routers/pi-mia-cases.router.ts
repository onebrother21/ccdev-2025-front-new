import { inject, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { PiMiaCasesController, PiMiaClientsController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class PiMiaCasesRouter extends InMemApiHandlersService {
  piMiaCases = inject(PiMiaCasesController);
  piMiaClients = inject(PiMiaClientsController);
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.endsWith('/piMiaCases/clients/all') && method === 'GET':return this.piMiaClients.all(req);
        case url.endsWith('/piMiaCases/clients') && method === 'POST':return this.piMiaClients.create(req);
        case url.endsWith('/piMiaCases/all') && method === 'GET':return this.piMiaCases.all(req);
        case url.endsWith('/piMiaCases/ops/calc-1') && method === 'POST':return this.piMiaCases.runCalcOne(req);
        case url.endsWith('/piMiaCases/ops/calc-2') && method === 'POST':return this.piMiaCases.runCalcTwo(req);
        case url.endsWith('/piMiaCases') && method === 'POST':return this.piMiaCases.create(req);
        case url.match(/\/piMiaCases\/q\?/) && method === 'GET':return this.piMiaCases.query(req,"q?");
        case url.match(/\/piMiaCases\/t\?/) && method === 'GET':return this.piMiaCases.search(req,"t?");
        case url.match(/\/piMiaCases\/\w+$/) && method === 'GET':return this.piMiaCases.fetch(req);
        case url.match(/\/piMiaCases\/\w+$/) && method === 'PUT':return this.piMiaCases.update(req);
        case url.match(/\/piMiaCases\/\w+$/) && method === 'DELETE':return this.piMiaCases.remove(req);
        //case url.match(/\/piMiaCases\/\w+\/activity/) && method === 'POST':return this.piMiaCases.saveActivity(req);
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}