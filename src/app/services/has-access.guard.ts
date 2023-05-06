import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { JwtService } from './jwt.service';
import { IJwtDecoded } from '../models/jwt-decoded.interface';

@Injectable({
  providedIn: 'root',
})
export class HasAccessGuard implements CanActivate {
  constructor(private _router: Router, private _jwtService: JwtService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this._jwtService.getTokenDecoded() as IJwtDecoded;
    if (this._jwtService.checkTokenIsValid(user)) {
      this._router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
