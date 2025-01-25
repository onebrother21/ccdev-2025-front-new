import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({providedIn:'root'})
@Pipe({
  name:'dateFormat',
  standalone:true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string|Date,format = 'MMM-dd-yyyy') {
    const datePipe = new DatePipe("en-US");
    const str = datePipe.transform(value,format);
    return str;
  }
}