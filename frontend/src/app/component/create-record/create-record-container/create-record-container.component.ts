import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/Interface/Appointment';

@Component({
  selector: 'app-create-record-container',
  templateUrl: './create-record-container.component.html',
  styleUrls: ['./create-record-container.component.css']
})
export class CreateRecordContainerComponent {
  @Input() tableName: string = ''
  @Input() appointmentsAsPsy: Appointment[] = []
  @Input() appointmentsAsSup: Appointment[] = []
}
