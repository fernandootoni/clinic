import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { appointmentCreateDTO } from 'src/app/Interface/AppointmentsCreate';
import { Patient } from 'src/app/Interface/Patient';
import { User } from 'src/app/Interface/User';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-register-appointment-form',
  templateUrl: './register-appointment-form.component.html',
  styleUrls: ['./register-appointment-form.component.css']
})
export class RegisterAppointmentFormComponent {
  @Input() userList: User[] = []
  @Input() patientList: Patient[] = []
  toastify: ToastifyHelper = new ToastifyHelper()
  appointmentCreateForm!: FormGroup

  constructor(
    private appointmentService: AppointmentService,
  ) {}

  days: { name: string, value: string}[] = [
    { name: 'Monday', value: 'Segunda' },
    { name: 'Tuesday', value: 'Terca' },
    { name: 'Wednesday', value: 'Quarta' },
    { name: 'Thursday', value: 'Quinta' },
    { name: 'Friday', value: 'Sexta' },
    { name: 'Saturday', value: 'Sabado' },
    { name: 'Sunday', value: 'Domingo' },
  ]

  ngOnInit(): void {
    this.appointmentCreateForm = new FormGroup({
      psychologist_id: new FormControl(''),
      supervisor_id: new FormControl(''),
      patient_id: new FormControl(''),
      day: new FormControl(''),
      hour: new FormControl(''),
      minute: new FormControl(''),
      duration: new FormControl(''),
    })
  }

  async submit() {
    const appointmentValues = this.appointmentCreateForm.getRawValue()
    const ableToCreateAppointment = this.appointmentIsValid(appointmentValues)

    if(ableToCreateAppointment) {
      try {
        await this.appointmentService.create(appointmentValues).toPromise()
          .then(() => 
            this.toastify.showMessage("Appointment created", "success", 3000)
          )
      } catch (error: any) {
        this.toastify.showMessage(error.error.message, "error", 3000)
      }
    } 
  }

  onPsySelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.appointmentCreateForm.value.psychologist_id = target.value 
  }

  onSupSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.appointmentCreateForm.value.supervisor_id = target.value 
  }

  onPatientSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.appointmentCreateForm.value.patient_id = target.value 
  }

  onDaySelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.appointmentCreateForm.value.day = target.value 
  }

  appointmentIsValid(appointmentValues: any): boolean {
    let invalidAppointment: boolean = false
    appointmentValues as appointmentCreateDTO

    if(!appointmentValues.psychologist_id) {
      this.toastify.showMessage("Choose a Psychologist", "warning", 3000)
      invalidAppointment = true
    }

    if(!appointmentValues.supervisor_id) {
      this.toastify.showMessage("Choose a Supervisor", "warning", 3000)
      invalidAppointment = true
    }

    if(!appointmentValues.patient_id) {
      this.toastify.showMessage("Choose a Patient", "warning", 3000)
      invalidAppointment = true
    }

    if(!appointmentValues.day) {
      this.toastify.showMessage("Choose a Day", "warning", 3000)
      invalidAppointment = true
    }

    if(isNaN(appointmentValues.hour)) {
      this.toastify.showMessage("Hour must be a Number", "warning", 3000)
      invalidAppointment = true

    } else if(!this.validateNumber(appointmentValues.hour)) {
      this.toastify.showMessage("Hour must have a value", "warning", 3000)
      invalidAppointment = true

    } else if(appointmentValues.hour < 0 || appointmentValues.hour > 23) {
      this.toastify.showMessage("Hour must be between 0 and 23", "warning", 3000)
      invalidAppointment = true
    }
    
    appointmentValues.hour = parseInt(appointmentValues.hour)

    if(isNaN(appointmentValues.minute)) {
      this.toastify.showMessage("Minute must be a Number", "warning", 3000)
      invalidAppointment = true
    } else if(!this.validateNumber(appointmentValues.minute)) {
      this.toastify.showMessage("Minute must have a value", "warning", 3000)
      invalidAppointment = true
    } else if(appointmentValues.minute < 0 || appointmentValues.minute > 59) {
      this.toastify.showMessage("Minute must be between 0 and 59", "warning", 3000)
      invalidAppointment = true
    }

    appointmentValues.minute = parseInt(appointmentValues.minute)

    if(isNaN(appointmentValues.duration)) {
      this.toastify.showMessage("Minute must be a Number", "warning", 3000)
      invalidAppointment = true
    } else if(!this.validateNumber(appointmentValues.duration)) {
      this.toastify.showMessage("Minute must have a value", "warning", 3000)
      invalidAppointment = true
    }

    appointmentValues.duration = parseInt(appointmentValues.duration)

    if(invalidAppointment)
      return false 
        else return true
  }

  validateNumber(input: string) {
    return /^\d+$/.test(input);
  }
}
