import { Component } from '@angular/core';
import { Patient } from 'src/app/Interface/Patient';
import { User } from 'src/app/Interface/User';
import { ToastifyHelper } from 'src/app/helper/Toastify';
import { AuthService } from 'src/app/service/auth.service';
import { PatientService } from 'src/app/service/patient.service';
import { RouteService } from 'src/app/service/route.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  toastify: ToastifyHelper = new ToastifyHelper()
  authenticated: boolean = false
  token: string = localStorage.getItem('Token') || ''
  users: User[] = []
  patients: Patient[] = []
  error: string[] = []
  showUserTable = true
  showPatientTable = true

  textoDigitado: string = ''

  filtro: User[] = []

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private patientService: PatientService,
    private routeService: RouteService
  ) {}

  async ngOnInit() {
    this.routeService.updateSideBarRoute()

    try {
      const user = await this.authService.checkUser().toPromise()
      if(user?.access_level! < 2) {
        this.authService.logout()
      } 
    } catch (error) {
      this.authService.logout()
    }

    this.authenticated = true

    const [allUsers, allPatients] = await Promise.all([
      this.userService.listUsers().toPromise(),
      this.patientService.listPatients().toPromise()
    ])

    this.users = allUsers!
    this.patients = allPatients!

    this.users.sort((user_A, user_B) => user_A.name.localeCompare(user_B.name))
    this.patients.sort((patient_A, patient_B) => patient_A.name.localeCompare(patient_B.name))
  }

  toggleUserView() {
    this.showUserTable = !this.showUserTable
  }

  togglePatientView() {
    this.showPatientTable = !this.showPatientTable
  }
}
