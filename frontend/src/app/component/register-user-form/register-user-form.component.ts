import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateUser } from 'src/app/Interface/CreateUser';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  registerForm!: FormGroup
  error: boolean = false
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor(
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      hourlywage: new FormControl(''),
      supervisorhourlywage: new FormControl(''),
    })
  }

  async submit() {
    const validPayload = this.payloadIsValid(this.registerForm.value)
    
    const user: CreateUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      hourlywage: this.registerForm.value.hourlywage,
      supervisorhourlywage: this.registerForm.value.supervisorhourlywage,
    }

    if(validPayload) {
      try {
        await this.userService.createUser(user).toPromise().then(() => {
          this.toastify.showMessage('User created', 'success', 3000)
        })
      } catch (error: any) {
        this.toastify.showMessage(error.error.message, 'error', 3000)
      }
    }
  }

  payloadIsValid(payload: any): boolean {
    let invalidPayload: boolean = false;
    if(!payload.name) {
      this.toastify.showMessage('Enter a name', 'warning', 3000)
      invalidPayload = true
    }
    
    if(!this.emailPattern.test(payload.email)) {
      this.toastify.showMessage('Invalid e-mail', 'warning', 4500)
      invalidPayload = true
    }

    if(!this.passwordPattern.test(payload.password)) {
      this.toastify.showMessage("Password must contain a LowerCase, UperCase, Special character and 8 characters", 'warning', 3000)
      invalidPayload = true
    }

    if(!payload.hourlywage) {
      payload.hourlywage = 0
    }

    if(!payload.supervisorhourlywage) {
      payload.supervisorhourlywage = 0
    }

    if (invalidPayload) 
      return false 
        else return true
  }
}
