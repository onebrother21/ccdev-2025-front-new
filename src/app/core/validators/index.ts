import { AbstractControl, AsyncValidatorFn, FormArray, FormGroup, ValidatorFn,ValidationErrors, Validators } from "@angular/forms";
import { debounceTime, map, Observable, take } from "rxjs";

export type FormDataTypes = string|number|boolean|((c:AbstractControl<any,any>) => ValidationErrors|null)[]|FormArray;
export type FormData = Partial<{[k:string]:FormDataTypes[];}>;

export function minSelectedCheckboxes(min = 1):ValidatorFn {
  const validator = (formArray:FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator as ValidatorFn;
}
export function checkMaxItemsLength(max = 10):ValidatorFn {
  const validator = (form:FormGroup) => {
    const total = Object.keys(form.controls)
      .map(control => form.controls[control].value)
      .reduce((prev, next) => next?prev + next:prev,0);
    return max >= total?null:{maxItems:true};
  };

  return validator as ValidatorFn;
}
export function checkMinItemsLength(min = 10):ValidatorFn {
  const validator = (form:FormGroup) => {
    const total = Object.keys(form.controls)
      .map(control => form.controls[control].value)
      .reduce((prev, next) => next?prev + next:prev,0);
    return min <= total?null:{minItems:true};
  };

  return validator as ValidatorFn;
}
export function checkAsyncError(errSelector:Observable<any>): AsyncValidatorFn {
  return (control:AbstractControl): Promise<{[key:string]:any}|null>|Observable<{[key:string]:any}|null> => {
    return errSelector.pipe(
      debounceTime(500),
      take(1),
      map(value => {
        console.log(value);
        return !!value ? { invalid: true } : null;}));
  };
}
export function emailOrUsernameValidator(usernameRegex:RegExp,emailRegex?:RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const usernameValidator = Validators.pattern(usernameRegex);
    const emailValidator = emailRegex?Validators.pattern(emailRegex):null;
    return control.value?.includes('@')?
    emailValidator?emailValidator(control):
    Validators.email(control):
    usernameValidator(control);
  };
}
export function atLeastOneCheckedValidator(minRequired = 1): ValidatorFn {
  const validator = (formGroup: FormGroup) => {
    let checked = 0;
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control.value === true) {checked ++;}
    });

    if (checked < minRequired) {return {atLeastOneCheckedErr: true};
    }
    return null;
  };
  return validator as ValidatorFn;
}
function isInvalidDate(value:string) {
  return !/((^(10|12|0?[13578])([/])(3[01]|[12][0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(11|0?[469])([/])(30|[12][0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(0?2)([/])(2[0-8]|1[0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(0?2)([/])(29)([/])([2468][048]00)$)|(^(0?2)([/])(29)([/])([3579][26]00)$)|(^(0?2)([/])(29)([/])([1][89][0][48])$)|(^(0?2)([/])(29)([/])([2-9][0-9][0][48])$)|(^(0?2)([/])(29)([/])([1][89][2468][048])$)|(^(0?2)([/])(29)([/])([2-9][0-9][2468][048])$)|(^(0?2)([/])(29)([/])([1][89][13579][26])$)|(^(0?2)([/])(29)([/])([2-9][0-9][13579][26])$))/.test(value)
}
const isInvalidDate2 = (dateStr:string) => JSON.stringify(new Date(dateStr)) === 'null';
function isFutureDate(date:string){return new Date(date).getTime() > new Date().getTime();}
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!(control && control.value)) return null;
    const date = control.value;
    const parts = date.split("-");
    const datestr = `${Number(parts[1])}/${Number(parts[2])}/${Number(parts[0])}`;
    const invalid = isInvalidDate2(date);
    const isFuture = isFutureDate(date);
    console.log(datestr,invalid,isFuture);
    return invalid || isFuture?{invalidDate:true}:null;
  }
}