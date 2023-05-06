import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { IJwtDecoded } from '../models/jwt-decoded.interface';
import { IUserDetail } from '../models/user-detail.interface';

@Component({
  selector: 'anywr-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  user: IUserDetail;

  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._route.snapshot?.data['title']);
    const tokenDecoder: IJwtDecoded =
      this._jwtService.getTokenDecoded() as IJwtDecoded;

    this._userService
      .getUserById(tokenDecoder?.userId)
      .subscribe((res: IUserDetail) => {
        this.user = res;
      });
  }

  handleLogout() {
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
