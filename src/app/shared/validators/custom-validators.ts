import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{10,}$/;
const emailRegexp = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$/;

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = passwordRegex.test(control.value);
  return valid ? null : { invalidPassword: true };
}

export function ConfirmPasswordMatchUp(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (
      matchingControl &&
      matchingControl.errors &&
      !matchingControl.hasError('mustMatch')
    ) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function EmailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = emailRegexp.test(control.value);
  return valid ? null : { invalidEmail: true };
}
