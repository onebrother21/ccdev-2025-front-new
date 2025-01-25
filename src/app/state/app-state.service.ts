import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState,AllActions,AllSelectors } from './app-state.state';
import { Observable } from 'rxjs';
import { Keys } from '@types';

type AppStoreDispatchType<T extends (a?:any) => any> = (...args:Parameters<T>) => ReturnType<Store<AppState>["dispatch"]>;
type ParamMerged = {[K in keyof AllActions]: (x: AllActions[K]) => void}[keyof AllActions] extends (x: infer I) => void ? { [K in keyof I]: I[K] } : never;
type Dispatchers = {[K in keyof ParamMerged]:AppStoreDispatchType<ParamMerged[K]>;};

type AppStoreSelectType<T> = () => ReturnType<Store<AppState>["select"]>;
type MergedSelectors = {[K in keyof AllSelectors]: (x: AllSelectors[K]) => void}[keyof AllSelectors] extends (x: infer I) => void ? { [K in keyof I]: I[K] } : never;
type Selectors = {[K in keyof MergedSelectors]:Observable<ReturnType<MergedSelectors[K]>>;};

export interface AppStateService extends Dispatchers,Selectors {
  "@":ParamMerged;
  "$":MergedSelectors;
  state$:Observable<AppState>;
};
@Injectable({providedIn:"root"})
export class AppStateService {
  constructor(private store:Store<AppState>){
    const setDispatchers = () => {
      const allActions:any = {};
      const featureKeys = Object.keys(AllActions) as (keyof AllActions)[];
      for(let i = 0,l = featureKeys.length;i<l;i++){
        const featureKey = featureKeys[i];
        const featureActions = AllActions[featureKey];
        const featureActionKeys = Object.keys(featureActions);
        for(let j = 0,m = featureActionKeys.length;j<m;j++){
          const featureActionKey = featureActionKeys[j] as keyof ParamMerged;
          const featureAction = (<ParamMerged>featureActions)[featureActionKey];
          const dispatcher = (...args:Parameters<typeof featureAction>) => this.store.dispatch((featureAction as any)(...args));
          this[featureActionKey] = dispatcher;
          allActions[featureActionKey] = featureAction;
        }
      }
      this["@"] = allActions;
    };
    const setSelectors = () => {
      const allSelectors:any = {};
      for(const k in AllSelectors){
        const K = k as keyof AllSelectors;
        const selectors = AllSelectors[K];
        const selectorKeys = Object.keys(selectors);
        for(let i = 0,l = selectorKeys.length;i<l;i++){
          const selectorKey = selectorKeys[i] as keyof MergedSelectors;
          const selector = (<MergedSelectors>selectors)[selectorKey];
          this[selectorKey] = this.store.select(selector);
          allSelectors[selectorKey] = selector;
        }
      }
      this["$"] = allSelectors;
    }
    setDispatchers();
    setSelectors();
    this.state$ = this.store.select(s => s);
  }
}