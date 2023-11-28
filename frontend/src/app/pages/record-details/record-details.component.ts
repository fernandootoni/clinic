import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentRecord } from 'src/app/Interface/AppointmentRecord';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.css']
})
export class RecordDetailsComponent {
  recordId: string = ''
  recordData: any = {}
  userLoggedIsAdmin: boolean = false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private recordService: AppointmentRecordService
  ) {}

  async ngOnInit() {
    try {
      const user = await this.authService.checkUser().toPromise()
      if(user!.access_level === 2) {
        this.userLoggedIsAdmin = true
      }
    } catch (error) {
      this.authService.logout()
    }

    this.route.paramMap.subscribe(params => {
      const recordId = params.get('id')
      this.recordId = recordId!
    })

    const record = await this.recordService.getRecord(this.recordId).toPromise()
    if(!record) throw new Error("Record not found")

    record!.appointment_date = this.formatDate(record.appointment_date)
    record!.done_date = this.formatDate(record.done_date)
    record!.formatted_created_at = this.formatDate(record.created_at.toString())
    record!.verified_date = this.formatDate(record.verified_date)

    Object.assign(this.recordData, record!)
  }

  formatDate(date: string) {
    const formattedDate = date.split("T")[0]
    const day = formattedDate.split("-")[2]
    const month = formattedDate.split("-")[1]
    const year = formattedDate.split("-")[0]

    date = `${day}/${month}/${year}`

    return date
  }
}
