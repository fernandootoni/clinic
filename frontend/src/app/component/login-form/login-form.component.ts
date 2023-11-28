import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { LoginData } from 'src/app/Interface/Login';
import { ToastifyHelper } from 'src/app/helper/Toastify';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() onSubmit = new EventEmitter<LoginData>()
  toastify: ToastifyHelper = new ToastifyHelper()

  loginForm!: FormGroup
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  submit() {
    let errors = false
    // if(!this.emailPattern.test(this.loginForm.value.email)) {
    //   this.errors = true
    //   this.toastify.showMessage("Invalid e-mail format", "warning", 3000)
    // }
    // if(!this.loginForm.value.password) {
    //   this.errors = true
    //   this.toastify.showMessage("Fill the password input", "warning", 3000)
    // }

    if(!errors) {
      const loginData: LoginData = {
        email: 'fernando.otoni@hotmail.com',
        password: '1234'
        // email: this.loginForm.value.email,
        // password: this.loginForm.value.password
      }

      this.onSubmit.emit(loginData)
    }
  }
}
