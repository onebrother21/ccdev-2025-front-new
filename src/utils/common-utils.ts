import { Constructor } from "../types";
import { isDevMode } from "@angular/core";
import { deepmerge } from "deepmerge-ts";

type sortArg<T> = keyof T | `-${string & keyof T}`;
const overwriteMerge = (destinationArray:any[], sourceArray:any[], options:any) => sourceArray;

export class CommonUtils {
  static isProd = (o = false):o is boolean =>  !isDevMode();
  static is = <T>(o:T):o is T => !(o === undefined || o === null);
  static isMatch = (test:RegExp|string[],...a:string[]):boolean => {
    for(let i = 0;i<a.length;i++){
      switch(true){
        case this.isArr(test) && test.length && test.indexOf(a[i]) > -1:return true;
        case (test as RegExp).test(a[i]):return true;
        case i == a.length - 1:return false;
        default:break;
      }
    }
    return false;
  };
  static isStr = (o:string|any):o is string => typeof o == "string";
  static isNum = (o:number|any):o is number => typeof o == "number";
  static isNumericStr = (s:string) => /^\d+$/.test(s) && typeof Number(s) === "number";
  static isBool = (o:boolean|any):o is boolean => typeof o == "boolean";
  static isArr = <T>(o:T[]|any):o is T[] => Array.isArray(<T[]>o);
  static isObj = (o:{}|any):o is object => !this.isArr(o) && !this.isFunc(o) && typeof o === "object";
  static isFunc = (o:Function|any):o is Function => typeof (<Function>o) == "function";
  static isErr = (o:Error|any):o is Error => o instanceof Error;
  static isDate = (o:Date|any):o is Date => o instanceof Date || this.isISODateStr(o);
  static isDateString = (s:string) => {
    try{
      return typeof new Date(s).getTime === 'function';
    }
    catch(e){
      return false;
    }
  };
  static isType = <T extends any,U extends Constructor<T>>(o:any,c:U):o is T => o instanceof c;
  static isEmpty = (o:any|any[]) => {
    if(o === undefined || o === null) return true;
    if(this.isObj(o)) return !Object.keys(o).length;
    if(this.isArr(o)) return !o.length;
    else throw(`global "empty" called on non-array or non-object`);
  };
  static randnum = (min:number,max:number) => Math.floor(Math.random() * (max - min + 1) + min);
  static generateSixDigitCode = ():string => {
    // Generate a random number between 100000 and 999999
    const code = Math.floor(100000 + Math.random() * 900000);
    // Convert the number to a string and pad with leading zeroes if necessary
    return code.toString().padStart(6, '0');
  }
  static S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  static longId = () => this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4();
  static shortId = () => this.S4()+this.S4();
  static slugify = (str:string,separator:string = "-") => {
    str = str.toLowerCase().trim().slice(0,19);
    // remove accents, swap ñ for n, etc
    const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaaaeeeeiiiioooouuuunc------";
    for (let i = 0,l = from.length;i < l;i++) {
      str = str.replace(new RegExp(from.charAt(i),"g"),to.charAt(i));
    }
    return str
    .replace(/[^a-z0-9 -]/g,"") // remove invalid chars
    .replace(/\s+/g,"-") // collapse whitespace and replace by -
    .replace(/-+/g,"-") // collapse dashes
    .replace(/^-+/,"") // trim - from start of text
    .replace(/-+$/,"") // trim - from end of text
    .replace(/-/g,separator);
  };
  static slugId = (s:string) => CommonUtils.slugify(s) + "-" + CommonUtils.S4() + CommonUtils.S4();
  static cap = (s:string,all?:boolean) => all?s.toUpperCase():(s[0].toUpperCase()+s.slice(1));
  static low = (s:string,all?:boolean) => all?s.toLowerCase():(s[0].toLowerCase()+s.slice(1));
  static snake = (s:string) => {
    let newStr = "";
    for(let i =0;i<s.length;i++){
      newStr += !i?s[i].toLowerCase():
      /[A-Z]/.test(s[i])?("-"+s[i].toLowerCase()):s[i];}
    return newStr;
  };
  static replaceData(str:string,data:any = {}){
    const dataReplacer = (withDelimiters:string,withoutDelimiters:string):string =>
    data.hasOwnProperty(withoutDelimiters)?
    data[withoutDelimiters]:
    withDelimiters;
    return str.replace(/{(\w+)}/g,dataReplacer);
  };
  static oProps = (o:{}|any) => {
    if(this.isObj(o)) return Object.keys(o);
    else throw `global "props" called on non-object`;
  };
  static oHas = (o:any[]|{}|any,k:string) => {
    if(this.isArr(o)) return o.indexOf(k) > -1;
    if(this.isObj(o)) return this.oProps(o).indexOf(k) > -1;
    else throw `global "has" called on non-array or non-object`;
  };
  static merge = <T>(x:Partial<T>,y:Partial<T>) => deepmerge(x,y,{arrayMerge:overwriteMerge}) as T;
  static dateParserX = (str:string|Date):Date => {
    if(str instanceof Date) return str;
    else if(new Date(str) instanceof Date) return new Date(str);
    else{
      //format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
      const day   = parseInt(str.substring(0,2));
      const month  = parseInt(str.substring(3,5));
      const yr   = parseInt(str.substring(6,10));
      const date = new Date(yr,month - 1,day);
      return date;
    }
  };
  static splitCamelCase = (s:string) => s.replace(/([a-z](?=[A-Z]))/g,'$1 ');
  static sleep = async (time: number) => new Promise((res) => setTimeout(res, time));
  static byPropertiesOf<T extends object> (sortBy: Array<sortArg<T>>) {
    function compareByProperty (arg: sortArg<T>) {
      let key: keyof T
      let sortOrder = 1
      if (typeof arg === 'string' && arg.startsWith('-')) {
        sortOrder = -1
        // Typescript is not yet smart enough to infer that substring is keyof T
        key = arg.slice(1) as keyof T
      } else {
        // Likewise it is not yet smart enough to infer that arg here is keyof T
        key = arg as keyof T
      }
      return function (a: T, b: T) {
        const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        return result * sortOrder
      }
    }
    return function (obj1: T, obj2: T) {
      let i = 0
      let result = 0
      const numberOfProperties = sortBy?.length
      while (result === 0 && i < numberOfProperties) {
        result = compareByProperty(sortBy[i])(obj1, obj2)
        i++;
      }
      return result
    }
  };
  static sort<T extends object> (arr: T[], ...sortBy: Array<sortArg<T>>) {
    arr.sort(this.byPropertiesOf<T>(sortBy));
  };
  static sortBy = (key:string, reverse?:true|false|1|0|null) => {
    const moveSmaller = reverse ? 1 : -1;
    const moveLarger = reverse ? -1 : 1;
    return (a:any, b:any) => {
      if (a[key] < b[key]) {
        return moveSmaller;
      }
      if (a[key] > b[key]) {
        return moveLarger;
      }
      return 0;
    };
  };
  static getFileInfoFromException(e:Error):any {
    const {stack} = e;
    if (!stack) return {};
    const match = /.*\n\s*at\s.*\s\((.*\/)*(.*):([\d]*):([\d]*)/.exec(stack);
    if (!match) return {};
    const o:any = {
       file: match[1],
       line: Number(match[2]),
       column: Number(match[3]),
    };
    o.str = `${o.file}, Line ${o.line}:${o.column}`;
    return o;
  };
  static padDigits(number:number, digits:number) {
    return Array(Math.max(digits - String(number).length + 1,0)).join("") + number;
  };
  /*
  static areDateRangesEqual(range1:DateRange, range2:DateRange): boolean {
    return (
      this.areDatesEqual(new Date(range1.from),new Date(range2.from)) &&
      this.areDatesEqual(new Date(range1.to),new Date(range2.to))
    );
  };
  */
  static areDatesEqual(date1: Date,date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  static coerceToMidnight(o?:Date): Date {
    if(o){
      const date = new Date(o);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    else {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
  };
  static dateAM = this.coerceToMidnight;
  static getHtmlTableType(k:string,p:any){
    switch(true){
      case p === undefined:
      case p === null:
      case typeof p === "string" && p === "":return "no-value";
      case typeof p === "boolean":return "yes-no";
      case Array.isArray(p):return !p.length?"arr-empty":"arr";
      case /\b\w*?(img|image|pic)\w+\b/.test(k):return "img";
      case typeof p === "string" && CommonUtils.isNumericStr(p):return "text";
      //case typeof p === "string" && CommonUtils.isDateString(p):
      case CommonUtils.isDate(p):return "date-time";
      case typeof p === "number":
      case typeof p === "string":return "text";
      default:return "object";
    }
  }
  static isISODateStr(s:string){
    /* eslint-disable max-len */
    // from https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
    const iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    // same as above, except with a strict 'T' separator between date and time
    const iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    /* eslint-enable max-len */
    const isValidDate = (str:string) => {
      // str must have passed the ISO8601 check
      // this check is meant to catch invalid dates
      // like 2009-02-31
      // first check for ordinal dates
      const ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
      if(ordinalMatch) {
        const oYear = Number(ordinalMatch[1]);
        const oDay = Number(ordinalMatch[2]);
        // if is leap year
        if ((oYear % 4 === 0 && oYear % 100 !== 0) || oYear % 400 === 0) return oDay <= 366;
        return oDay <= 365;
      }
      const matchO = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/);
      if(matchO){
        const match = matchO.map(Number);
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const monthString = month ? `0${month}`.slice(-2) : month;
        const dayString = day ? `0${day}`.slice(-2) : day;
        // create a date object and compare
        const d = new Date(`${year}-${monthString || '01'}-${dayString || '01'}`);
        if (month && day) {
          return d.getUTCFullYear() === year
            && (d.getUTCMonth() + 1) === month
            && d.getUTCDate() === day;
        }
        return true;
      }
      return false;
    };
    const isISO8601 = (str:string, options:{strict?:boolean,strictSeparator?:string} = {}) => {
      const check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
      if (check && options.strict) return isValidDate(str);
      return check;
    }
    return isISO8601(s);
  }
  static flattenObject(obj:any, parentKey:string = '', result:any = {}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          CommonUtils.flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }
}