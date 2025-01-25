import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'prettyPrintLocStr',
  standalone:true,
})
export class PrettyPrintLocationStrPipe implements PipeTransform {
  transform(loc?:string,opts:{format?:"2-lines"} = {format:"2-lines"}):string {
    if(!loc) return "";
    let s = "";
    const parts = loc.split("/");
    switch(opts.format){
      default:{
        return parts[0] + (parts[1]?", "+ parts[1]:"") + "<br>" + 
        parts[2] + 
        (parts[3]?", "+ parts[3]:"") +
        (parts[4]?", "+ parts[4]:"") +
        (parts[5]?", "+ parts[5]:"") +
        (parts[6]?", "+ parts[6]:"");
      }
    }
  }
}