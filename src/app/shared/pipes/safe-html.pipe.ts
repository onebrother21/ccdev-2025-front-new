import { Injectable,Pipe,PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({providedIn:'root'})
@Pipe({
  name:'safeHtml',
  standalone:true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(html:string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}