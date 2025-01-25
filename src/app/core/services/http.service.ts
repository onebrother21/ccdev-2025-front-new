import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { DeletedEntity,ApiQuery,ApiResponseBody,AppError } from "@types";

@Injectable({providedIn:"root"})
export class AppHttpService {
  constructor(private http:HttpClient){}
  get<T>(url = ""){return this.http.get<ApiResponseBody<T>>(url);}
  post<T>(url = "",body = {}){return this.http.post<ApiResponseBody<T>>(url,body);}
  put<T>(url = "",body = {}){return this.http.put<ApiResponseBody<T>>(url,body);}
  del<T = undefined>(url = ""){return this.http.delete<ApiResponseBody<T|DeletedEntity>>(url);}
  query<T>(url = "",q:ApiQuery<T>){return this.http.get<ApiResponseBody<T>>(url + "?"+this.getQueryStr(q));}
  getQueryStr<T>(q:ApiQuery<T>){
    const timestamp = `ts=${Date.now()}`;
    const nextQ = (p:string) => JSON.stringify(q[p as keyof ApiQuery<T>]);
    const qstr = Object.keys(q).reduce((o,p) => o+`&${p}=${nextQ(p)}`,timestamp);
    return qstr;
  }
  mapError(r:RegExp[],e:HttpErrorResponse|Error|AppError){
    const errStr = ((e as any).error as Error).message;
    const appErrStr = (e as any).error.info as string;
    const E = [e.message,errStr,appErrStr];
    for(let i = 0,l = r.length;i<l;i++){
      for(let j = 0,m = E.length;j<m;j++){
        //console.log(r[i],E[j],new RegExp(r[i]).test(E[j]));
        if(new RegExp(r[i]).test(E[j])) return true;
      }
    }
    return false;
  }
  getRandomElement<T>(array:T[]): T {return array[Math.floor(Math.random() * array.length)];}
}
