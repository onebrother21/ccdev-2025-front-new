export type Digit = "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9";
export type Constructor<T> = new (...args:any[]) => T;
export type DeepPartial<T> = {[P in keyof T]?:DeepPartial<T[P]>;};
export type DeepPartialExcept<T,K extends keyof T> = DeepPartial<T> & Pick<T,K>;

export type AnyBoolean = boolean|1|0|null;
export type Nullable<T> = T|null;
export type Newable<T> = { new (...args: any[]): T; };
export type Keys<T> = Extract<keyof T,string>;
export type Values<T> = {[k in keyof T]:T[k]}[keyof T];
export type Primitive = string|number|boolean|Date|Error;
export type PrimitiveArr = Primitive[];
export interface Primitives {[key:string]:Primitive|PrimitiveArr|Primitives|Primitives[];}
export type DataMap<T> = {[key:string]:T};
export type Enum<T,K extends string|undefined = undefined,J extends string|undefined = undefined> =
(K extends string?Record<K,T>:DataMap<T>) &
(J extends string?Partial<Record<J,T>>:{});
export type Strings<K extends string|undefined = undefined> = Enum<string,K>;
export type Numbers<K extends string|undefined = undefined> = Enum<number,K>;
export type Bools<K extends string|undefined = undefined> = Enum<boolean,K>;
export type Method<T> = (...params:any[]) => T;
export type Methods<T> = DataMap<Method<T>>;
export type TypedMethod<T,U> = (...params:(T|any)[]) => U;
export type TypedMethods<T,U> = DataMap<TypedMethod<T,U>>;
export type LocaleDateOpts = Record<"weekday"|"month"|"day"|"year"|"hour"|"minute"|"second",string> & {hour12?:boolean;};

export type Entity = {
  id:string;
  cid:string;
  creator:"_self_"|string;
  createdOn:string|Date;
  updatedOn?:string|Date;
  removedOn?:string|Date;
  desc?:string;
  info?:MiscInfo;
  meta?:MiscInfo;
};
export type Collection<T,K extends string = ""> = {
  new:Partial<T>;
  items:{[k in K]:T[]};
  selected:Nullable<{id:string;i:number;item:T}>;
};
export type DeletedEntity = {id:string;ok:AnyBoolean;};

export type ReqValidationError = {msg:string;param:string;location:string;};
export type ValidationErrors = {errors:ReqValidationError[]|Primitives};
export type ErrorConfig = Partial<{
  type:string;
  message:string;
  msg:string;
  status:number;
  code:number|string;
  warning:boolean;
  src:string;
  info:MiscInfo;
} & ValidationErrors>;
export type ErrorObj = Error & ErrorConfig & Entity;
export type ErrorType = Error|ErrorObj|ValidationErrors;
export type Errors<K extends string|undefined = undefined> = Enum<ErrorType,K>;

export type MiscInfo = Primitives;
export type Status<K extends string> = {name:K;time:string|Date;info?:MiscInfo;};
export type HrsOfOperation = `${number}${"am"|"pm"} - ${number}${"am"|"pm"}`;
export type PhoneNumber = `+${number}-${number}-${number}-${number}`;
export type ZipCode = `${number}`;

export type LocationStr = `${string}/${string}/${string}/${string}/${string}/${ZipCode}/${string}`;
export type LocationObj = Record<"city"|"state"|"country",string> & Partial<Record<"address"|"zip"|"phn"|"name"|"desc",string>>;
export type AddressObj = Record<"streetAddr"|"city"|"state"|"postal"|"country",string>;

export type LocationData = Partial<{
  str:LocationStr;
  obj:LocationObj;
  coords:[number,number];
}>;
export type ModelMiscReference = {model:string;ref:string;};
export type ApiQuery<T> = {
  query:Partial<Record<keyof T,any>>;
  opts?:Partial<Record<"limit"|"skip",number> & {sort:keyof T|`-${Keys<T>}`}>;
  select?:"json"|Keys<T>[];
};
export type ApiResponseBody<T> = {
  data:T;
  status:number;
  token:string;
  csrfToken?:string;
};
export type TableInfo = Record<string,{
  data:any;
  type:"text"|"img"|"obj"|"date"|"date-time"|"yesno"|"null"|"undefined"|"arr"|"arr-empty";
  canEdit?:boolean;
  trim?:number;
}>;
export type GridInfo = {n:number;icon?:string;label:string};
export type DateRange = {from:Date,to:Date};
export interface ScriptModel {
  name:string;
  src:string;
  async?:boolean;
  loaded?:boolean;
}
export interface IAppUser {id:string;role:string;appId:string;appname:string;}
export interface IError extends Error {
  status:number;
  code?:string;
  info?:string;
  errors?:(string|Error|any)[];
}