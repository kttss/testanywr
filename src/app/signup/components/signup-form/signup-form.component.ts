import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { UserService } from './../../../services/user.service';
import {
  ConfirmPasswordMatchUp,
  PasswordValidator,
  EmailValidator,
} from '../../../shared/validators/custom-validators';
import { IUserForm } from './../../../models/user-form.interface';

@Component({
  selector: 'anywr-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
  @Input() requesting = false;
  @Output() onsubmit = new EventEmitter<any>();
  form: any;
  private subscription: Subscription;

  get f() {
    return this.form.controls;
  }

  constructor(
    private _fbuild: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fbuild.group(
      {
        username: this._fbuild.control<string>('', [Validators.required]),
        password: this._fbuild.control<string>('', [
          Validators.required,
          PasswordValidator,
        ]),
        confirmpassword: this._fbuild.control<string>('', [
          Validators.required,
        ]),
        email: new FormControl<string>('', [
          Validators.required,
          EmailValidator,
        ]),
      },
      {
        validator: ConfirmPasswordMatchUp('password', 'confirmpassword'),
      }
    );

    this._checkUsernameIsUnique();
  }

  private _checkUsernameIsUnique(): void {
    this.subscription = this.form
      .get('username')
      .valueChanges.pipe(
        debounceTime(500),
        switchMap((value: string) => this._userService.getUsersByName(value))
      )
      .subscribe((isExist: boolean) => {
        if (isExist) {
          this.form.controls.username.setErrors({ userExist: true });
        }
      });
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    } else {
      const user: IUserForm = {
        username: this.form.value.username as string,
        password: this.form.value.password as string,
        email: this.form.value.email as string,
      };
      this.onsubmit.emit(user);
    }
  }

  navigateToLogin() {
    this._router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
