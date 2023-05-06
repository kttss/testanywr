import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { IUserDetail } from '../models/user-detail.interface';
import { IUserForm } from '../models/user-form.interface';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private _checkUserbyUsernameAndPassword(
    users: IUserDetail[],
    username: string,
    password: string
  ): boolean {
    const [user] = users;
    return user?.username === username && user?.password === password;
  }

  login(username: string, password: string): any {
    return this.http.get(`${environment.apiUrl}User?username=${username}`).pipe(
      switchMap((data) => {
        // Verify password is correct
        const users = data as IUserDetail[];
  
        if (this._checkUserbyUsernameAndPassword(users, username, password)) {
          return this.jwtService.generateToken(users[0].id);
        } else {
          return throwError(() => 'user_invalid');
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  addUser(user: IUserForm) {
    return this.http.post(`${environment.apiUrl}User`, user);
  }

  getUserById(userId: string): Observable<IUserDetail> {
    return this.http.get<IUserDetail>(`${environment.apiUrl}User/${userId}`);
  }

  getUsersByName(username: string): Observable<boolean> {
    return this.http
      .get<IUserDetail[]>(`${environment.apiUrl}User?username=${username}`)
      .pipe(
        map((response: IUserDetail[]) => {
          return response.some((item) => item.username === username);
        })
      );
  }
}
