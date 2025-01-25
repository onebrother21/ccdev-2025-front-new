//import "hammerjs";
import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { HammerModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppHttpInterceptor, AppLocalStorageService } from 'app/core';
//import { InMemApiProvider } from '@api';
import { AppConfigurationFactory, AppConfigurationService } from './app.config.service';
import { appRoutes } from './app.routes';
import { UrlSerializer } from '@angular/router';
import { StoreModule,MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule,RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppRouterStateSerializer,AppRouterUrlSerializer } from 'app/core';
import { environment as env } from '@env';
import { REDUCERS,EFFECTS,AppState,initialAppState as initialState } from '@state';

const metaReducers:MetaReducer<AppState>[] = !env.production?[storeFreeze]:[];

export const appConfig: ApplicationConfig = {
  providers: [
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory:AppConfigurationFactory,
      deps: [AppConfigurationService],
      multi: true,
    },
    //provideFirebaseApp(() => initializeApp(env.firebase)),
    //provideFirestore(() => getFirestore()),
    //provideStorage(() => getStorage()),
    {provide:UrlSerializer,useClass:AppRouterUrlSerializer},
    {provide:RouterStateSerializer,useClass:AppRouterStateSerializer},
    {provide:HTTP_INTERCEPTORS,multi:true,useClass:AppHttpInterceptor},
    //{provide:HTTP_INTERCEPTORS,multi:true,useClass:InMemApiProvider},
    //{provide:HAMMER_LOADER,useValue:() => import("hammerjs")},
    provideRouter(appRoutes,withHashLocation()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      CommonModule,
      StoreModule.forRoot(REDUCERS,{metaReducers,initialState}),
      StoreRouterConnectingModule.forRoot(),
      EffectsModule.forRoot(EFFECTS),
      !env.production?StoreDevtoolsModule.instrument({maxAge:25}):[],
      //HammerModule,
      ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    ),
  ]
};
