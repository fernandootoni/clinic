import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Interface/Appointment';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AppointmentService } from 'src/app/service/appointment.service';
import { AuthService } from 'src/app/service/auth.service';
import { PatientService } from 'src/app/service/patient.service';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  id: string = ''
  patientName: string = ''
  patientAppointments: Appointment[] = []
  responsibleName: string = ''
  authenticated: boolean = false
  errors: string[] = []

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private routeService: RouteService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.id = id!
    })

    this.routeService.updateSideBarRoute()

    const [ user, patient ] = await Promise.all([
      this.authService.checkUser().toPromise(),
      this.patientService.getPatient(this.id).toPromise()
    ])
    if(!user || !patient || user.access_level < 2) {
      this.toastify.showMessage('You cannot access here', 'error', 3000)
      return
    }

    this.authenticated = true
    this.patientName = patient.name
    this.responsibleName = patient.responsible

    const allPatientAppointments = await this.appointmentService.listPatientAppointments(this.id).toPromise()
    this.patientAppointments = allPatientAppointments!
  }
}
