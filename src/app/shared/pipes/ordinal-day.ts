import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'ordinalDay',
  standalone:true,
})
export class OrdinalDayPipe implements PipeTransform {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  transform(datestr:string|Date): string {
    const date = new Date(datestr);
    if(!date){
      console.warn("value is not a date",datestr);
      return datestr.toLocaleString();}
    const day = date.getDate(),
    month = this.months[date.getMonth()],
    year = date.getFullYear(),
    twoDigit = day % 100;
    let suffix;
    if(twoDigit > 9 && twoDigit < 20) suffix = 'th';
    else switch(day % 10){
      case 1:suffix = 'st';break;
      case 2:suffix = 'nd';break;
      case 3:suffix = 'rd';break;
      default:suffix = 'th';break;}
    return day + suffix + " "+month+" "+year;
  }
}