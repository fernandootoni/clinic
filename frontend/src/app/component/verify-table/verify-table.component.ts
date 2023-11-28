import { Component, Input } from '@angular/core';
import { AppointmentRecord } from 'src/app/Interface/AppointmentRecord';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';

@Component({
  selector: 'app-verify-table',
  templateUrl: './verify-table.component.html',
  styleUrls: ['./verify-table.component.css']
})
export class VerifyTableComponent {
  @Input() tableName: string = ''
  @Input() recordsAsPsy: AppointmentRecord[] = []
  @Input() recordsAsSup: AppointmentRecord[] = []
  toastify: ToastifyHelper = new ToastifyHelper()

  constructor(
    private recordService: AppointmentRecordService
  ) {}

  ngOnInit() {
    this.recordsAsPsy.map(record => {
      if(!record.formatted) {
        record.appointment_date = this.formatDate(record.appointment_date)
        record.formatted_created_at = this.formatCreatedAt(record.created_at)
        record.formatted = true
      }
    })
    
    this.recordsAsSup.map(record => {
      if(!record.formatted) {
        record.appointment_date = this.formatDate(record.appointment_date)
        record.formatted_created_at = this.formatCreatedAt(record.created_at)
        record.formatted = true
      }
    })
  }

  verifyRecord(id: string){
    let record = this.recordsAsPsy.find(record => record.id === id)
    if(!record) {
      record = this.recordsAsSup.find(record => record.id === id)
    }
    
    if(record) {
      try {
        this.recordService.verify(record.id).toPromise().then(() => {
            this.toastify.showMessage("Verified", "success", 1500)
        })
        record!.verified = true
      } catch (error: any) {
        this.toastify.showMessage(error.error.message, "error", 2000)
      }
    }
  }

  formatDate(date: string) {
    const formattedDate = date.split("T")[0].split("-")

    const day = formattedDate[2]
    const month = formattedDate[1]
    const year = formattedDate[0]

    return `${day}/${month}/${year}`
  }

  formatCreatedAt(date: Date) {
    const formattedDate = date.toString().split("T")[1].split(":")
    
    const hour = formattedDate[0]
    const minute = formattedDate[1]

    const formattedCreatedDay = this.formatDate(date.toString())

    return `${formattedCreatedDay} - ${hour}h${minute}`
  }
}