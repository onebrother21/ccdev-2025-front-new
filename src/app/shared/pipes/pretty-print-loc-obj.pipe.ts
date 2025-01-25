import { Injectable,Pipe,PipeTransform } from '@angular/core';
import { LocationObj } from '_commoncore/common';

@Injectable({providedIn:'root'})
@Pipe({
  name:'prettyPrintLocObj',
  standalone:true,
})
export class PrettyPrintLocationObjPipe implements PipeTransform {
  transform(loc?:LocationObj,opts:{format?:"2-lines"} = {format:"2-lines"}):string {
    if(!loc) return "";
    return (loc.name || loc.desc?(loc.name||"") + (loc.desc?", "+ loc.desc:"") + "<br>":"") +
    (loc.addressLine1||"Address unknown") + (loc.addressLine2?", "+ loc.addressLine2:"") + "<br>" + 
    (loc.city||"City unknown") + 
    (loc.county?", "+ loc.county:"") +
    (loc.state?", "+ loc.state:"") +
    (loc.zip?", "+ loc.zip:"") +
    (loc.country?", "+ loc.country:"");
  }
}