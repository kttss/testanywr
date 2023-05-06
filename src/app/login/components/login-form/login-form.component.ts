import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILogin } from 'src/app/models/login.interface';
import { PasswordValidator } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'anywr-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() requesting= false;
  @Output() onsubmit = new EventEmitter<ILogin>();

  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      PasswordValidator,
    ]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private _router:Router){}

  handleSubmit():void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    } else {
      this.onsubmit.emit(this.form.value as ILogin);
    }
  }

  navigateToSignup(){
    this._router.navigateByUrl('/signup')
  }
}
