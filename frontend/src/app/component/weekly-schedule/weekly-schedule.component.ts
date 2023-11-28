import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/Interface/Appointment';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.css']
})
export class WeeklyScheduleComponent {
  @Input() appointments: Appointment[] = []
  @Input() tableName: string = ''
  appointmentsByDay: { name: string, data: Appointment[]}[] = [
    { name: "Domingo", data: [] },
    { name: "Segunda", data: [] },
    { name: "Terca", data: [] },
    { name: "Quarta", data: [] },
    { name: "Quinta", data: [] },
    { name: "Sexta", data: [] },
    { name: "Sabado", data: [] }
  ]

  ngOnInit() {
    this.appointments.map((appointment) => {
      this.appointmentsByDay.map((appointmentByDay) => {
        if(appointmentByDay.name === appointment.day) {
          appointmentByDay.data.push(appointment)
        }
      })
    })

    this.appointmentsByDay[0].name = 'Sunday'
    this.appointmentsByDay[1].name = 'Monday'
    this.appointmentsByDay[2].name = 'Tuesday'
    this.appointmentsByDay[3].name = 'Wednesdey'
    this.appointmentsByDay[4].name = 'Thursday'
    this.appointmentsByDay[5].name = 'Friday'
    this.appointmentsByDay[6].name = 'Saturday'

    this.appointmentsByDay.forEach((day) => {
      day.data.sort((a, b) => {
        const dateA = new Date()
        const dateB = new Date()

        dateA.setHours(a.hour)
        dateB.setHours(b.hour)

        return dateA.getTime() - dateB.getTime()
      })
    })
  }
}
