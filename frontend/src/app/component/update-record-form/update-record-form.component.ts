import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentRecord } from 'src/app/Interface/AppointmentRecord';
import { Patient } from 'src/app/Interface/Patient';
import { UpdateRecord } from 'src/app/Interface/UpdateRecord';
import { User } from 'src/app/Interface/User';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';

@Component({
  selector: 'app-update-record-form',
  templateUrl: './update-record-form.component.html',
  styleUrls: ['./update-record-form.component.css']
})
export class UpdateRecordFormComponent {
  @Input() userList: User[] = []
  @Input() patientList: Patient[] = []
  @Input() record: any = []
  descriptions: string[] = [ "Ok", "Patient canceled", "Psychologist canceled"]
  toastify: ToastifyHelper = new ToastifyHelper()
  updateForm!: FormGroup

  constructor(
    private recordService: AppointmentRecordService
  ) {}

  ngOnInit() {
    this.record.appointment_date = this.formatDate(this.record.appointment_date)
    this.record.done_date = this.formatDate(this.record.done_date)
    this.record.verified_date = this.formatDate(this.record.verified_date)

    this.updateForm = new FormGroup({
      psychologist_id: new FormControl(this.record.psychologist_id),
      supervisor_id: new FormControl(this.record.supervisor_id),
      appointment_date: new FormControl(this.record.appointment_date),
      duration: new FormControl(this.record.duration),
      done: new FormControl(this.record.done),
      psychologist_done: new FormControl(this.record.psychologist_done),
      supervisor_done: new FormControl(this.record.supervisor_done),
      done_description: new FormControl(this.record.done_description),
      done_date: new FormControl(this.record.done_date),
      verified: new FormControl(this.record.verified),
      verified_by: new FormControl(this.record.verified_by),
      verified_date: new FormControl(this.record.verified_date),
    })
  }

  // psychologist_id, supervisor_id, appointment_date, duration, done, psychologist_done, 
  // supervisor_done, done_description, done_date, verified, verified_by, verified_date

  async submit() {
    const payload = this.updateForm.getRawValue()
    const isValid = this.updatePayloadIsValid(payload)

    const payloadDTO = payload as UpdateRecord
    if(isValid) {
      try {
        await this.recordService.updateRecord(this.record.id, payloadDTO).toPromise()
          .then(() => this.toastify.showMessage("Record updated", "success", 3000))
      } catch (error: any) {
        this.toastify.showMessage(error.error.message, "error", 3000)
      }
    }
  }

  onPsySelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.updateForm.value.psychologist_id = target.value 
  }

  onSupSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.updateForm.value.supervisor_id = target.value 
  }

  onDescriptionSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    
    this.updateForm.value.done_description = target.value 
  }

  updatePayloadIsValid(payload: any): boolean {
    let isValid: boolean = true

    Object.keys(payload).forEach(key => {
      if(!payload[key] && (typeof payload[key] !== 'boolean')) {
        this.toastify.showMessage('Fill all fields', 'warning', 3000)
        isValid = false
      }
    })

    let appointmentDateIsValid = this.verifyDate(payload.appointment_date)
    let appointmentDoneDateIsValid = this.verifyDate(payload.done_date)
    let appointmentVerifiedIsValid = this.verifyDate(payload.verified_date)
    if(!appointmentDateIsValid || !appointmentDoneDateIsValid || !appointmentVerifiedIsValid) {
      this.toastify.showMessage("Appointment Date formatted is not valid", 'warning', 3000)
      isValid = false
    }

    payload.appointment_date = this.formatToYYYYMMDD(payload.appointment_date)
    payload.done_date = this.formatToYYYYMMDD(payload.done_date)
    payload.verified_date = this.formatToYYYYMMDD(payload.verified_date)

    if(isNaN(payload.duration)) {
      this.toastify.showMessage("Minute must be a Number", "warning", 3000)
      isValid = false

    } else if(!this.validateNumber(payload.duration)) {
      this.toastify.showMessage("Minute must have a value", "warning", 3000)
      isValid = false
    }

    return isValid
  }

  formatDate(date: string) {
    const dateSplit = date.split("T")[0]
    const day = dateSplit.split("-")[2]
    const month = dateSplit.split("-")[1]
    const year = dateSplit.split("-")[0]

    return `${day}/${month}/${year}`
  }

  verifyDate(date: string) {
    let isValid = true
    const characterVerify = /[a-zA-Z]/

    if(characterVerify.test(date)) {
      console.log(date)
      this.toastify.showMessage('Date cannot have any character', 'warning', 3000)
      isValid = false
    }

    const actualYear = new Date().getFullYear()
    const day = parseInt(date.split("/")[0])
    const month = parseInt(date.split("/")[1])
    const year = parseInt(date.split("/")[2])

    if(isNaN(day) || isNaN(month) || isNaN(year)) {
      this.toastify.showMessage('Format not valid', 'warning', 3000)
      isValid = false
    }

    if(day > 31 || day < 0) {
      this.toastify.showMessage('Day must be between 1 and 31', 'warning', 3000)
      isValid = false
    }
    if(month > 12 || month < 0) {
      this.toastify.showMessage('Month must be between 1 and 12', 'warning', 3000)
      isValid = false
    }
    if(year > actualYear + 1 || year < actualYear - 1) {
      this.toastify.showMessage(`Year cannot be lesser than ${actualYear - 1} neither greater than ${actualYear + 1}`, 'warning', 3000)
      isValid = false
    }

    return isValid
  }

  formatToYYYYMMDD(date: string) {
    const day = date.split("/")[0]
    const month = date.split("/")[1]
    const year = date.split("/")[2]

    return `${year}/${month}/${day}`
  }

  validateNumber(input: string) {
    return /^\d+$/.test(input);
  }
}
