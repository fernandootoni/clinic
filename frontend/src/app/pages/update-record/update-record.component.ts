import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/Interface/Patient';
import { User } from 'src/app/Interface/User';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';
import { PatientService } from 'src/app/service/patient.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent {
  users: User[] = []
  patients: Patient[] = []
  record: any = []
  pageLoaded: boolean = false
  updateForm!: FormGroup
  recordId: string = ''

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private patientService: PatientService,
    private recordService: AppointmentRecordService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const recordId = params.get('id')
      this.recordId = recordId!
    })

    const [ users, patients, record ] = await Promise.all([
        this.userService.listUsers().toPromise(),
        this.patientService.listPatients().toPromise(),
        this.recordService.getRecord(this.recordId).toPromise()
      ]
    )

    this.users = users!
    this.patients = patients!
    this.record = record!
    this.pageLoaded = true
  }
}