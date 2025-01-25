import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'longSpaceDate',
  standalone:true,
})
export class LongSpaceDatePipe implements PipeTransform {
  transform(datestr:string): string {
    const dateArr = datestr.split(" ");
    const day = dateArr[0];
    const numericValue = day ? parseInt(day, 10) : NaN;
    if(!isNaN(numericValue)) {
      const twoDigit = numericValue % 100;
      if (twoDigit > 9 && twoDigit < 20) {return day + 'th';}
      switch (numericValue % 10) {
        case 1:return day + 'st';
        case 2:return day + 'nd';
        case 3:return day + 'rd';
        default:return day + 'th';
      }
    }
    return day + " "+dateArr[1]+" "+dateArr[2];
  }
}