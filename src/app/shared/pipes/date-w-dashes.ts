import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'dateWithDashes',
  standalone:true,
})
export class DateWithDashesPipe implements PipeTransform {
  transform(date?:string|Date,opts:{withTime?:boolean;twoDigitYr?:boolean} = {}):string {
    if(!date) return "";
    const d = (date instanceof Date?date:new Date(date)) as Date;
    const day = d.getDate(),month = d.getMonth() + 1,yr = d.getFullYear();
    let hrs = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hrs >= 12 ? 'pm' : 'am';
    const hr = hrs % 12?hrs % 12: 12; // the hour '0' should be '12'
    const min = minutes < 10 ? '0'+minutes : minutes;
    const timestr = hr + ':' + min + ' ' + ampm;
    return `${month}-${day}-${opts.twoDigitYr?yr.toString().slice(2):yr}${opts.withTime?' '+timestr:""}`;
  }
}