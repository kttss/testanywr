import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";

import { IJwtDecoded } from '../models/jwt-decoded.interface';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

    // Generate a JWT token with a user ID value that expires after 2 minutes.
    generateToken(userId: string) {
      const timeNow = new Date().getTime();
      const iat = Math.floor(timeNow);;
      const exp =  Math.floor(new Date(timeNow + 2 * 60000).getTime()); ;
      const payload = {
        claims: {
          iat,
          exp,
          userId,
        },
        key: 'anywr',
        alg: 'HS256',
      }; 
      return this.http.post('/tokens', {
        ...payload,
      });
    }

    getTokenDecoded(){
      const token = sessionStorage.getItem('jwt');
      return token ? jwt_decode(token) : null;
    }


    checkTokenIsValid(token:IJwtDecoded){
      return token && new Date().getTime() <new Date(token.exp).getTime()
    }
}
