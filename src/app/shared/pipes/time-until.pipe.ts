import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'timeUntil',
  standalone:true,
  pure:true
})
export class TimeUntilPipe implements PipeTransform {
  transform(value:any):any {
    if(value){
      const seconds = Math.floor((+new Date() - +new Date(value))/1000);
      //if(seconds < 29) return 'Just now';// less than 30 seconds ago will show as 'Just now'
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
        const p = -(seconds / intervals[k]);
        counter = Math.floor(p);
        if(counter > 0) return counter + ' ' + k + (counter !== 1?'s ':' ') +'left';
      }
    }
    return value;
  }
}