import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createPatient } from 'src/app/Interface/CreatePatient';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-register-patient-form',
  templateUrl: './register-patient-form.component.html',
  styleUrls: ['./register-patient-form.component.css']
})
export class RegisterPatientFormComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  registerForm!: FormGroup
  error: boolean = false

  constructor(
    private patientService: PatientService
  ) {}

  async ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      responsible: new FormControl(''),
      phone: new FormControl('')
    })
  }

  async submit() {
    if(!this.registerForm.value.name) {
      this.toastify.showMessage('Enter a name', 'warning', 3000)
      this.error = true
    }
    
    if(!this.registerForm.value.responsible) {
      this.toastify.showMessage('Enter a responsible for the patient', 'warning', 3000)
      this.error = true
    }

    if(!this.registerForm.value.phone) {
      this.toastify.showMessage("Enter a phone", 'warning', 3000)
      this.error = true
    }
    
    const patient: createPatient = {
      name: this.registerForm.value.name,
      responsible: this.registerForm.value.responsible,
      phone: this.registerForm.value.phone,
    }

    if(!this.error) {
      try {
        await this.patientService.create(patient).toPromise().then(() => {
          this.toastify.showMessage('Patient created', 'success', 3000)
        })
      } catch (error: any) {
        this.toastify.showMessage(error.error.message, 'error', 3000)
      }
    }
  }
}
