import {
  HttpResponse,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ApiResponseBody, AppError, CommonUtils } from '_commoncore/common';
import { ToastrService } from 'ngx-toastr';
import { of,tap,catchError,take,lastValueFrom, delay,map, switchMap } from 'rxjs';

type NotifierReq = {type:string,data:any,url:string};
type NotifierResp = {url:string} & Partial<{status:number,body:{data:any},err:AppError}>;


// notification.service.ts
@Injectable({
  providedIn: 'root'
})
export class SuperCalculator {
  private calcUrl = 'http://localhost:4400/en/';
  private useToasterAsNotifier = true;
  private templates:any = {
    'calc-1': 'User {{userName}}, result: {{result}}',
    // Add more templates as needed
  };
  constructor(private http: HttpClient,private toastr: ToastrService){}
  
  private formatTemplate(template:string,data:any): string {
    return template.replace(/{{(\w+)}}/g, (_, key) => data[key] || '');
  }
  private getCalcHttp(message:string,data?:any){
    return this.http.post<ApiResponseBody<any>>(this.calcUrl,{message,...data})
    .pipe(
      map(({data}) => data),
      tap(res => console.log('Super calc online result',res)),
      catchError(e => of(e).pipe(tap(() => console.error('Error using super calc online',e))))
    );
  }
  private getCalcToast(message:string,data:any){
    return of(null)
    .pipe(
      delay(2000),
      tap(() => this.toastr.info(message,`(${CommonUtils.cap(data.method)}) ${data.title}`,{closeButton:true})),
      map(() => ({status:200,data})),
      tap(res => console.log('Calc 1 Resp:',res)),
      catchError(e => of(e).pipe(tap(() => console.error('Error using super calc local',e))))
    );
  }
  private getTitle(str:string){
    const A0 = str.split("-");
    const A1 = A0.map(s => CommonUtils.cap(s));//captialize each word
    const A2 = A1.map((s,i) => i == A1.length - 1?s + "!":s)//add exclamation point to last word
    const title = A2.join(" ");//generate title
    return title;
  }
  private getMsg(type:string,data:any) {
    const template = this.templates[type];
    if (!template) throw new Error(`Template for type ${type} not found.`);
    const formattedMessage = this.formatTemplate(template,data);
    return formattedMessage;
  }
  calculate(n:number){return n * 3;}
  calc = (method:'in-app',o:NotifierReq) => {
    const type = o.type;
    const data = {
      ...o.data,
      result:this.calculate(o.data.n),
      title:this.getTitle(type),
      method
    };
    const msg = this.getMsg(type,data);
    return lastValueFrom(
      of(null)
      .pipe(
        switchMap(() => {
          if(this.useToasterAsNotifier) return this.getCalcToast(msg,data);
          else return this.getCalcHttp(msg,data);
        })
      )
    );
  }
}
