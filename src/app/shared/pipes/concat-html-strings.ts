import { Injectable,Pipe,PipeTransform } from '@angular/core';

@Injectable({providedIn:'root'})
@Pipe({
  name:'concatHTML',
  standalone:true
})
export class ConcatHTMLStringsPipe implements PipeTransform {
  transform(content:string|string[]): string {
    return Array.isArray(content)?content.join(""):content;}
}