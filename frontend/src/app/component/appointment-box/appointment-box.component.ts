import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appointment-box',
  templateUrl: './appointment-box.component.html',
  styleUrls: ['./appointment-box.component.css']
})
export class AppointmentBoxComponent {
  @Input() appointment: any = ''
}
