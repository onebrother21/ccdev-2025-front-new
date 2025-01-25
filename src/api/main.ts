import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InMemApiHandlersService } from './types';
import {
  AuthRouter,
  //CasesRouter,
  //PostsRouter,
  //JPMoneyRouter,
  //PiMiaCasesRouter,
  //HelpSRsRouter,
} from './routers';
/*
import { CustomersRouter } from "./customers.router";
import { UsersRouter } from './users.router';
import { CasesRouter } from './cases.router';
import { BugsRouter } from './bugs.router';
import { TrovesRouter } from './troves.router';
import { SensorsRouter } from './sensors.router';
import { LatticesRouter } from "./lattices.router";
import { BudgetsRouter } from './budgets.router';
*/


@Injectable({providedIn:"root"})
export class MainApiRouter extends InMemApiHandlersService {
  auth = inject(AuthRouter);
  /*
  posts = inject(PostsRouter);
  cases = inject(CasesRouter);
  jpmoney = inject(JPMoneyRouter);
  piMiaCases = inject(PiMiaCasesRouter);
  helpSRs = inject(HelpSRsRouter);
  */
  main = (req:HttpRequest<any>):Observable<HttpEvent<any>> => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case /auth/.test(url):return this.auth.route(req);
        /*
        case /customers/.test(url):return this.customers.route(req);
        case /users/.test(url):return this.users.route(req);
        case /admin\/bugs/.test(url):return this.bugs.route(req);
        case /troves/.test(url):return this.troves.route(req);
        case /fyre\/sensors/.test(url):return this.fyreSensors.route(req);
        case /fyre\/lattices/.test(url):return this.fyreLattices.route(req);
        case /swift\/budget/.test(url):return this.swiftBudgets.route(req);
        */
        /*
        case /posts/.test(url):return this.posts.route(req);
        case /cases/.test(url):return this.cases.route(req);
        case /jpmoney/.test(url):return this.jpmoney.route(req);
        case /piMiaCases/.test(url):return this.piMiaCases.route(req);
        case /helpSRs/.test(url):return this.helpSRs.route(req);
        */
        case /connect/.test(url):return this.ok({config:{ready:true}});
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}