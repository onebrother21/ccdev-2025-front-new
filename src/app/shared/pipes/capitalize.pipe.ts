import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(content:any,all?:boolean|"all"):string {
    if("string" == typeof content) return all?content.toLocaleUpperCase():content[0].toLocaleUpperCase() + content.slice(1);
    return content;
  }
}