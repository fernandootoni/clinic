import { Component, Input } from '@angular/core';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';

@Component({
  selector: 'app-done-table',
  templateUrl: './done-table.component.html',
  styleUrls: ['./done-table.component.css']
})
export class DoneTableComponent {
  @Input() options: any[] = []
  @Input() tableName: any
  @Input() tableType: string = ''

  constructor(
    private recordService: AppointmentRecordService
  ) {}

  verify(id: string) {
    try {
      this.recordService.verify(id).toPromise().then(() => {
        const optionIndex = this.options.findIndex((option: any) => {
          return option.id === id
        })
    
        this.options.splice(optionIndex, 1)
      })
    } catch (error) {
      console.log("Something went wrong")
    }
  }
}