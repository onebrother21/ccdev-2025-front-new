import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'stringTrim',
  standalone:true,
})
export class StringTrimPipe implements PipeTransform {
  transform(str:string = "",length = 20): string {
    return str.length > length?str.slice(0,length)+"...":str;
  }
}