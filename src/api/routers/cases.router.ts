import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CasesController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class CasesRouter extends InMemApiHandlersService {
  constructor(private cases:CasesController){super();}
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.endsWith('/cases/all') && method === 'GET':return this.cases.all(req);
        case url.endsWith('/cases') && method === 'POST':return this.cases.create(req);
        case url.match(/\/cases\/q\?/) && method === 'GET':return this.cases.query(req,"q?");
        case url.match(/\/cases\/t\?/) && method === 'GET':return this.cases.search(req,"t?");
        case url.match(/\/cases\/\w+$/) && method === 'GET':return this.cases.fetch(req);
        case url.match(/\/cases\/\w+$/) && method === 'PUT':return this.cases.update(req);
        case url.match(/\/cases\/\w+$/) && method === 'DELETE':return this.cases.remove(req);
        //case url.match(/\/cases\/\w+\/activity/) && method === 'POST':return this.cases.saveActivity(req);
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}