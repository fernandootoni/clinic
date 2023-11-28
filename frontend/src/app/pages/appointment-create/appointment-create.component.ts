import { Component } from '@angular/core';
import { Patient } from 'src/app/Interface/Patient';
import { User } from 'src/app/Interface/User';
import { PatientService } from 'src/app/service/patient.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent {
  userList: User[] = []
  patientList: Patient[] = []
  pageLoaded: boolean = false

  constructor(
    private userService: UserService,
    private patientService: PatientService
  ) {}

  async ngOnInit() {
    const users = await this.userService.listUsers().toPromise()
    const patients = await this.patientService.listPatients().toPromise()

    this.userList = users!
    this.patientList = patients!

    this.pageLoaded = true
  }
}
