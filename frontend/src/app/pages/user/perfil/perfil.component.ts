import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Interface/Appointment';
import { AppointmentRecord } from 'src/app/Interface/AppointmentRecord';
import { User } from 'src/app/Interface/User';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

interface userData {
  data: User
  appointments: {
    asPsy: Appointment[]
    asSup: Appointment[]
    unverified: {
      asPsy: AppointmentRecord[]
      asSup: AppointmentRecord[]
    }
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  authenticated: boolean =false
  id: string = ''
  user: userData = {
    data: {
      id: '',
      name: '',
      email: '',
      password: '',
      hourlywage: 0,
      supervisorhourlywage: 0,
      created_at: new Date(),
      access_level: 0,
      enable: true,
    },
    appointments: {
      asPsy: [],
      asSup: [],
      unverified: {
        asPsy: [],
        asSup: []
      }
    }
  }
  loaded: boolean = false

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private appointmentRecordService: AppointmentRecordService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.id = id!
    })

    let userLogged
    let dashboardUser
    try {
      [ userLogged, dashboardUser ] = await Promise.all([
        this.authService.checkUser().toPromise(),
        this.userService.getUser(this.id).toPromise(),
      ])
    } catch (error) {
      this.authService.logout()
    }

    if(!userLogged || !dashboardUser) {
      this.toastify.showMessage('User not found', 'error', 3000)
      return
    }
    if(userLogged.id !== this.id && userLogged.access_level < 2) {
      this.toastify.showMessage('You cannot access here', 'error', 3000)
      return
    }

    this.user.data = dashboardUser
    const [appointmentsPsy, appointmentsSup, appointmentsUnverified] = await Promise.all([
      this.appointmentService.listAppointmentsAsPsychologist(this.id).toPromise(),
      this.appointmentService.listAppointmentsAsSupervisor(this.id).toPromise(),
      this.appointmentRecordService.getUnverifiedByUser(this.id).toPromise()
    ])

    if(appointmentsPsy!.length > 0 || appointmentsSup!.length > 0) {
      this.user.appointments.asPsy = appointmentsPsy!
      this.user.appointments.asSup = appointmentsSup!
    }

    if(appointmentsUnverified) {
      this.user.appointments.unverified.asPsy = appointmentsUnverified?.appointmentsUnverifiedAsPsy!
      this.user.appointments.unverified.asSup = appointmentsUnverified?.appointmentsUnverifiedAsSup!
    }
    this.loaded = true
    this.authenticated = true
  }
}
