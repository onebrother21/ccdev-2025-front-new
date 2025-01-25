import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'elapsedTime',
  standalone:true,
  pure:true
})
export class ElapsedTimePipe implements PipeTransform {
  transform(ms:number):any {
    const seconds = ms/1000;
    if(seconds < 29) return 'Less than a minute';
    const intervals:{[key:string]:number} = {
      'year':31536000,
      'month':2592000,
      'week':604800,
      'day':86400,
      'hour':3600,
      'minute':60,
      'second':1,
    };
    let counter:any;
    for(const k in intervals){
      counter = Math.floor(seconds / intervals[k]);
      if(counter > 0){
        if(counter === 1) return counter + ' ' + k; // singular (1 day ago)
        else return counter + ' ' + k + 's'; // plural (2 days ago)
      }
    }
  }
}