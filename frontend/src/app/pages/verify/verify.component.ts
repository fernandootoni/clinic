import { Component } from '@angular/core';
import { AppointmentRecord } from 'src/app/Interface/AppointmentRecord';
import { User } from 'src/app/Interface/User';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';
import { RouteService } from 'src/app/service/route.service';
import { UserService } from 'src/app/service/user.service';

interface UserData {
  id: string
  name: string
  appointmentsUnverified: {
   asPsy: AppointmentRecord[] 
   asSup: AppointmentRecord[] 
  }
  showAppointmentsUnverified: boolean
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  public appointmentsUnverified: AppointmentRecord[] = []
  public readyToBeVerify: AppointmentRecord[] = []
  public users: User[] = []
  public userData: UserData[] = []
  public nothingToShow: boolean = false

  constructor(
    private routeService: RouteService,
    private appointmentRecordService: AppointmentRecordService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.routeService.updateSideBarRoute()

    const [ unverified, allUser ] = await Promise.all([
      this.appointmentRecordService.getAllUnverified().toPromise(),
      this.userService.listUsers().toPromise()
    ])

    if(unverified!.length === 0) {
      this.nothingToShow = true
      return
    }

    this.appointmentsUnverified = unverified!
    this.users = allUser!

    this.appointmentsUnverified.map((appointment) => {
      const appointmentDayNumber: number = new Date(appointment.appointment_date).getDay()
      switch (appointmentDayNumber) {
        case 0: appointment.dayName = 'Monday'; break;
        case 1: appointment.dayName = 'Tuesday'; break;
        case 2: appointment.dayName = 'Wednesday'; break;
        case 3: appointment.dayName = 'Thursday'; break;
        case 4: appointment.dayName = 'Friday'; break;
        case 5: appointment.dayName = 'Saturday'; break;
        case 6: appointment.dayName = 'Sunday'; break;
      }

      if(appointment.psychologist_done && appointment.supervisor_done) {
        this.readyToBeVerify.push(appointment)
      }
    })

    this.users.forEach(user => {
      this.userData.push({ 
        id: user.id,
        name : user.name, 
        showAppointmentsUnverified: false,
        appointmentsUnverified: { 
          asPsy: [], 
          asSup: []
        }
      })
    })

    this.userData.map(user => {
      this.appointmentsUnverified.map((record) => {
        if(record.psychologist_id === user.id) {
          user.appointmentsUnverified.asPsy.push(record)
        }
        if(record.supervisor_id === user.id) {
          user.appointmentsUnverified.asSup.push(record)
        }
      })
    })
  }
}
