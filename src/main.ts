/*
 =========================================================
 * Black Dashboard Angular - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard-angular
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment as env } from '@env';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

async function initApiConnection() {
  return fetch(`${env.apiUrl}/connect`,{
    method:'GET',
    mode:'cors',
    credentials:'include',
    headers:{'Content-Type':'application/json'}
  })
  .then(res => res.json())
  .then(o => {
    if(o.status == 404) throw o;
    return o.config;
  })
  .catch(e => console.error(e));
}

(async () => {
  if(env.production) enableProdMode();
  bootstrapApplication(AppComponent,appConfig)
  //.then(async () => await initApiConnection())
  .catch((err) => console.error(err));
})();