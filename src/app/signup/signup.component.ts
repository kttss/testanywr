import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../services/user.service';
import { IUserForm } from '../models/user-form.interface';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'anywr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  requesting = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alert: AlertService,
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._route.snapshot?.data['title']);
  }

  onsubmit(user: IUserForm) {
    this.requesting = true;
    this._userService.addUser(user).subscribe((res) => {
      this.requesting = false;
      this._alert.succes('User has been created');
      this._router.navigateByUrl('/login');
    });
  }
}
