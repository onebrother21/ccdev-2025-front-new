import { inject, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { JPMoneyController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class JPMoneyRouter extends InMemApiHandlersService {
  jpmoneyPokerPlans = inject(JPMoneyController);
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.endsWith('/jpmoneyPokerPlans/all') && method === 'GET':return this.jpmoneyPokerPlans.all(req);
        case url.endsWith('/jpmoneyPokerPlans/ops/calc-1') && method === 'POST':return this.jpmoneyPokerPlans.runCalcOne(req);
        case url.endsWith('/jpmoneyPokerPlans/ops/calc-2') && method === 'POST':return this.jpmoneyPokerPlans.runCalcTwo(req);
        case url.endsWith('/jpmoneyPokerPlans') && method === 'POST':return this.jpmoneyPokerPlans.create(req);
        case url.match(/\/jpmoneyPokerPlans\/q\?/) && method === 'GET':return this.jpmoneyPokerPlans.query(req,"q?");
        case url.match(/\/jpmoneyPokerPlans\/t\?/) && method === 'GET':return this.jpmoneyPokerPlans.search(req,"t?");
        case url.match(/\/jpmoneyPokerPlans\/\w+$/) && method === 'GET':return this.jpmoneyPokerPlans.fetch(req);
        case url.match(/\/jpmoneyPokerPlans\/\w+$/) && method === 'PUT':return this.jpmoneyPokerPlans.update(req);
        case url.match(/\/jpmoneyPokerPlans\/\w+$/) && method === 'DELETE':return this.jpmoneyPokerPlans.remove(req);
        //case url.match(/\/jpmoneyPokerPlans\/\w+\/activity/) && method === 'POST':return this.jpmoneyPokerPlans.saveActivity(req);
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}