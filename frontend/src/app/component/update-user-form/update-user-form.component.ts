import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateUser } from 'src/app/Interface/UpdateUser';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  userId: string = ''
  pageLoaded: boolean = false
  updateForm!: FormGroup
  error: boolean = false
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.userId = id!
    })
    
    const user = await this.userService.getUser(this.userId).toPromise()
    if(!user) throw new Error("User not found")
    
    this.updateForm = new FormGroup({
      name: new FormControl(user.name),
      email: new FormControl(user.email),
      password: new FormControl(""),
      hourlywage: new FormControl(user.hourlywage),
      supervisorhourlywage: new FormControl(user.supervisorhourlywage),
    })
    
    this.pageLoaded = true
  }

  async submit() {
    const validPayload = this.payloadIsValid(this.updateForm.value)
    const userPayload = this.updateForm.value as UpdateUser
    if(validPayload) {
      try {
        await this.userService.update(userPayload, this.userId).toPromise()
          .then(() => {
            this.toastify.showMessage('User Updated', 'success', 3000)
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
