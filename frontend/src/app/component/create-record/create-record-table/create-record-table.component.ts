import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/Interface/Appointment';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';

@Component({
  selector: 'app-create-record-table',
  templateUrl: './create-record-table.component.html',
  styleUrls: ['./create-record-table.component.css']
})
export class CreateRecordTableComponent {
  @Input() appointments: Appointment[] = []
  @Input() tableName: string = ''
  toastify: ToastifyHelper = new ToastifyHelper()

  constructor(
    private appointmentRecordService: AppointmentRecordService
  ) {}

  async ngOnInit() {
    this.appointments.map(appointment =>{
      appointment.patient_name = this.formatName(appointment.patient_name)
      appointment.psychologist_name = this.formatName(appointment.psychologist_name)
      appointment.supervisor_name = this.formatName(appointment.supervisor_name)

      appointment.day = this.formatDayName(appointment.day)
    })

  }

  formatName(name: string) {
    const nameSplitted = name.split(' ')
    if(nameSplitted.length > 1) {
      name = `${nameSplitted[0]} ${nameSplitted[1]}`
    }

    return name
  }

  async createRecord(id: string) {
    let record = this.appointments.find(appointment => appointment.id == id)
    
    try {
      await this.appointmentRecordService.createRecord(id, record).toPromise().then(() => {
        this.toastify.showMessage("Record created", 'success', 1500)
      })
    } catch (error: any) {
      this.toastify.showMessage(error.error.message, 'error', 2000)
    }
  }

  formatDayName(name: string) {
    switch(name){
      case 'Segunda':
        name = 'Monday'; break;
      
      case 'Terca':
        name = 'Tuesday'; break;
      
      case 'Quarta':
        name = 'Wednesday'; break;
        
      case 'Quinta':
        name = 'Thursday'; break;
       
      case 'Sexta':
        name = 'Friday'; break;
        
      case 'Sabado':
        name = 'Saturday'; break;
      
      case 'Domingo':
        name = 'Sunday'; break;
    } 
    
    return name
  }
}
