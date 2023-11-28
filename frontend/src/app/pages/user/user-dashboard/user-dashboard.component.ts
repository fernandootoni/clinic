import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Interface/Appointment';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';

import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthService } from 'src/app/service/auth.service';
import { RouteService } from 'src/app/service/route.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  id: string = ''
  dashboardUsername: string = ''
  authenticated: boolean = false
  markAppointments: boolean = false
  appointmentsLoaded: boolean = false
  errors: string[] = []
  appointmentsAsPsy: Appointment[] = []
  appointmentsAsSup: Appointment[] = []

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.id = id!
    })
    this.routeService.updateSideBarRoute()  

    let user
    let dashboardUser
    try {
      [ user, dashboardUser ] = await Promise.all([
        this.authService.checkUser().toPromise(),
        this.userService.getUser(this.id).toPromise(),
      ])
    } catch (error) {
      this.authService.logout()      
    }
    if(!user || !dashboardUser) {
      this.errors.push('User not found')
      return
    }
    if(user.id !== this.id && user.access_level < 2) {
      this.errors.push('You cannot access here!')
      return
    }
    if(user.id === this.id) {
      this.markAppointments = true
    }

    this.authenticated = true
    this.dashboardUsername = dashboardUser.name

    const [appointmentsPsy, appointmentsSup] = await Promise.all([
      this.appointmentService.listAppointmentsAsPsychologist(this.id).toPromise(),
      this.appointmentService.listAppointmentsAsSupervisor(this.id).toPromise()
    ]);
    this.appointmentsAsPsy = appointmentsPsy!
    this.appointmentsAsSup = appointmentsSup!

    this.appointmentsLoaded = true
  }
}
