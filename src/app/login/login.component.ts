import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../services/user.service';
import { ILogin } from '../models/login.interface';
import { IToken } from '../models/token.interface';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'anywr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  requesting = false;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alertService: AlertService,
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._route.snapshot?.data['title']);
  }

  onSubmit(loginInfo: ILogin) {
    this.requesting = true;
    this._userService.login(loginInfo.username, loginInfo.password).subscribe(
      (res: IToken) => {
        this.requesting = false;
        sessionStorage.setItem('jwt', res.token);
        this._router.navigateByUrl('/');
      },
      (err: string) => {
        this.requesting = false;
        this._alertService.error(
          'username or password is incorrect. ensure both user account and password are valid'
        );
      }
    );
  }
}
