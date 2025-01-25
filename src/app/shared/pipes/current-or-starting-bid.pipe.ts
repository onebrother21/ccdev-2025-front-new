import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'currentOrStartingBid',
  standalone:true,
  pure:true
})
export class CurrentOrStartingBidPipe implements PipeTransform {
  transform(value:any):any {
    if(value && value.bids && value.startingBid){
      const last = value.bids[value.bids.length - 1];
      const current = last?last.amt:0;
      const starting = value.startingBid;
      value = current || starting;
      return value;
    }
    return NaN;
  }
}