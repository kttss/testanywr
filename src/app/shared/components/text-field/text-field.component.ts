import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'anywr-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input()
  control: FormControl;

  @Input()
  label: string;

  @Input()
  type: 'text' | 'password' | 'email' = 'text';

  hide:boolean = true;

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'this fiels is mandatory';
    } else if (this.control.hasError('invalidPassword')) {
      return 'Password invalid';
    } else if (this.control.hasError('invalidEmail')) {
      return 'Email invalid';
    } else if (this.control.hasError('userExist')) {
      return 'This name already used';
    } else if (this.control.hasError('mustMatch')) {
      return 'Passwords do not match. Please try again';
    } else {
      return '';
    }
  }
}
