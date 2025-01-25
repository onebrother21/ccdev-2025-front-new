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
export class InMemApiNotifier {
  private smsUrl = 'http://localhost:4400/en/';
  private emailUrl = 'http://localhost:4400/en/';
  private notificationUrl = "https://twilio.com/sendMsg?user=8888888888&key=99999999999";
  private useToasterAsNotifier = true;
  private templates:any = {
    'registration': 'Welcome {{userName}}! Thanks for registering.',
    'verification': 'Your verification code is {{code}}.',
    'new-login': 'We noticied a new login for {{userName}} from this device: {{userDevice}}',
    'pin-reset': 'Your pin number has been changed.',
    'forgot-username': 'We have sent instructions to {{email}}. Please check your email and proceed as advised. Thank you',
    'forgot-pin': 'Hi {{userName}}, we have received your request to reset your pin. Please follow the link provided...\n'+
    'http://{{appUrl}}/en/abc123/reset/{{resetTkn}}?ts={{timeStamp}}&loc={{userLoc}}',
    // Add more templates as needed
  };
  constructor(private http: HttpClient,private toastr: ToastrService){}
  private getNotificationMsg(type:string,data:any) {
    const template = this.templates[type];
    if (!template) throw new Error(`Template for type ${type} not found.`);
    const formattedMessage = this.formatTemplate(template,data);
    return formattedMessage;
  }
  private formatTemplate(template:string,data:any): string {
    return template.replace(/{{(\w+)}}/g, (_, key) => data[key] || '');
  }
  private sendEmail(message:string,data?:any){
    return this.http.post<ApiResponseBody<any>>(this.emailUrl,{message,...data})
    .pipe(
      map(({data}) => data),
      tap(res => console.log('Email sent successfully',res)),
      catchError(e => of(console.error('Error sending email',e)))
    );
  }
  private sendSMS(message:string,data?:any){
    return this.http.post<ApiResponseBody<any>>(this.smsUrl,{message,...data})
    .pipe(
      map(({data}) => data),
      tap(res => console.log('Sms sent successfully',res)),
      catchError(e => of(console.error('Error sending sms',e)))
    );
  }
  private sendNotification(message:string,data?:any){
    return this.http.post<ApiResponseBody<any>>(this.notificationUrl,{message,...data})
    .pipe(
      map(({data}) => data),
      tap(res => console.log('Notification sent successfully',res)),
      catchError(e => of(e).pipe(tap(() => console.error('Error sending notification',e))))
    );
  }
  private sendToaster(message:string,data:any){
    return of(null)
    .pipe(
      delay(2000),
      tap(() => this.toastr.info(message,`(${CommonUtils.cap(data.method)}) ${data.title}`,{closeButton:true})),
      map(() => ({status:200})),
      //tap(res => console.log('Notification sent successfully',res)),
      catchError(e => of(e).pipe(tap(() => console.error('Error sending notification',e))))
    );
  }
  private getNotificationTitle(str:string){
    const A0 = str.split("-");
    const A1 = A0.map(s => CommonUtils.cap(s));//captialize each word
    const A2 = A1.map((s,i) => i == A1.length - 1?s + "!":s)//add exclamation point to last word
    const title = A2.join(" ");//generate title
    return title;
  }
  notify = (method:'email'|'sms'|'notification',o:NotifierReq) => {
    const type = o.type;
    const data = {...o.data,method,title:this.getNotificationTitle(type)};
    const msg = this.getNotificationMsg(type,data);
    return lastValueFrom(
      of(null)
      .pipe(
        switchMap(() => {
          if(this.useToasterAsNotifier) return this.sendToaster(msg,data);
          else switch(method){
            case 'sms':return this.sendSMS(msg,data);
            case 'email':return this.sendEmail(msg,data);
            case 'notification':return this.sendNotification(msg,data);
          }
        })
      )
    );
  }
}
