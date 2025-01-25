import { AppEntity,AppError,Collection } from "@types";

export interface CommonState{
  loading:boolean;
  error:Error|ReturnType<AppError["json"]>|null;
}
export interface CommonStateWithHistory<T = any> extends CommonState {history:T[];}
export type CommonStateWithEntity<T> = T & AppEntity & CommonState;
export interface CommonStateWithEntities<T = any> extends CommonState {items:T[];selected:number;}
export interface CommonStateWithCollections<T = any> extends CommonState,Collection<T> {}

export const initializeCommonState = () => ({loading:false,error:null});
export const initializeHistoryState = () => ({history:[]});
export const initializeEntitiesState = () => ({items:[],selected:-1,});
export const initializeCollectionState = () => ({items:[],ids:[],selected:null,});
export const initializeCommonStateWithEntity = <T>():CommonStateWithEntity<T> => initializeCommonState() as CommonStateWithEntity<T>;
export const initializeCommonStateWithHistory = <T>():CommonStateWithHistory<T> => ({
  ...initializeCommonState(),
  ...initializeHistoryState(),
  
});
export const initializeCommonStateWithEntities = <T>():CommonStateWithEntities<T> => ({
  ...initializeCommonState(),
  ...initializeEntitiesState(),
});
export const initializeCommonStateWithCollection = <T>():CommonStateWithEntities<T> => ({
  ...initializeCommonState(),
  ...initializeEntitiesState(),
});