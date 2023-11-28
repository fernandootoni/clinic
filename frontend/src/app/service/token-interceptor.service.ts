import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  token: string = localStorage.getItem('Token') || ''

  constructor(private authService: AuthService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

    return next.handle(modifiedRequest)
  }
}
