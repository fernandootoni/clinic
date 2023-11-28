import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment';
import { LoginData } from '../Interface/Login';
import { AuthResponse } from '../Interface/AuthResponse';
import { User } from '../Interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiURL: string = environment.baseApiURL

  constructor(private http: HttpClient) { }

  login(userData: LoginData) {
    return this.http.post<AuthResponse>
      (`${this.baseApiURL}/auth`, userData)
  }

  checkUser(): Observable<User> {
    return this.http.get<User> (`${this.baseApiURL}/auth/checkuser`)
  }

  logout() {
    localStorage.removeItem('Token')
    localStorage.removeItem('Name')
    localStorage.removeItem('AccessLevel')
    localStorage.removeItem('ID')
    localStorage.removeItem('FirstTimeAtHomePage')

    window.location.href = '/';
  }
}
