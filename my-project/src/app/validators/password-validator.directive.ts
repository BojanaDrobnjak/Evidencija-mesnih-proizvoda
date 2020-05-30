import { Directive } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[appPasswordValidator]"
})
export class PasswordValidatorDirective {
  constructor() {}
}

export function daLiSeSifrePodudaraju(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid =
      control.parent.controls["ponoviSifru"].value ===
      control.parent.controls[controlName].value;
    return isValid ? null : { daLiSeSifrePodudaraju: { value: control.value } };
  };
}
