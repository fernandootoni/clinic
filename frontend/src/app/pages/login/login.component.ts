import { Component } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { LoginData } from 'src/app/Interface/Login';
import { ToastifyHelper } from 'src/app/helper/Toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  authenticated: boolean = false;
  token: string = localStorage.getItem('Token') || ''
  username: string = localStorage.getItem('Name')! || ''
  accessLevel: number = parseInt(localStorage.getItem('AccessLevel')!) || 0
  firstTimeAtHomePage: string = localStorage.getItem('FirstTimeAtHomePage')! || ''
  id: string = localStorage.getItem('ID')! || ''
  
  constructor(
    private authService: AuthService,
  ) {}
  
  ngOnInit() {
    this.authenticated = !!this.token;

    if(this.firstTimeAtHomePage === 'true') {
      this.toastify.showMessage(`Welcome, ${this.username}`, 'success', 4000)
      localStorage.setItem('FirstTimeAtHomePage', 'false')
    }
  }

  async login(userData: LoginData) {
    try {
      const authData = await this.authService.login(userData).toPromise()
      if(authData?.token) {
        localStorage.setItem('Token', authData.token)
        localStorage.setItem('Name', authData.user.name.split(' ')[0])
        localStorage.setItem('AccessLevel', authData.user.accessLevel.toString())
        localStorage.setItem('ID', authData.user.id)
        localStorage.setItem('FirstTimeAtHomePage', 'true')
      
        window.location.href = window.location.href
      }
    } catch (error: any) {
      this.toastify.showMessage(error.error.message, 'error', 4000)
    }
  }

  welcomeMessage() {
    console.log("Hey")
  }
}


