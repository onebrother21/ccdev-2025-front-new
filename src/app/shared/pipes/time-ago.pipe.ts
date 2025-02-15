import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'timeAgo',
  standalone:true,
  pure:true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value:any):any {
    if(value){
      const seconds = Math.floor((+new Date() - +new Date(value))/1000);
      if(seconds < 29) return 'Just now';// less than 30 seconds ago will show as 'Just now'
      const intervals:{[key:string]:number} = {
        'yr':31536000,
        'mo':2592000,
        'wk':604800,
        'day':86400,
        'hr':3600,
        'min':60,
        'sec':1,
      };
      let counter:any;
      for(const i in intervals){
        counter = Math.floor(seconds / intervals[i]);
        if(counter > 0){
          if(counter === 1) return counter + ' ' + i + ' ago'; // singular (1 day ago)
          else return counter + ' ' + i + 's ago'; // plural (2 days ago)
        }
      }
    }
    return value;
  }
}