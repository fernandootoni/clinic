import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonthRecord } from 'src/app/Interface/MonthRecord';
import { RecordsUnverified } from 'src/app/Interface/RecordsUnverified';
import { AppointmentRecordService } from 'src/app/service/appointment-record.service';
import { AuthService } from 'src/app/service/auth.service';
import { RouteService } from 'src/app/service/route.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  id: string = ''
  dashboardUsername: string = ''
  authenticated: boolean = false
  pageLoaded: boolean = false
  error: string[] = []
  monthsAvailable: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  yearsAvailable: number[] = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1]
  monthRecord: MonthRecord = {
    psyRecords: [],
    supRecords: [],
    salaryAsPsy: 0,
    salaryAsSup: 0,
    totalSalary: 0
  }
  appointmentsUnverified: RecordsUnverified = {
    appointmentsUnverifiedAsPsy: [],
    appointmentsUnverifiedAsSup: []
  }
  selectedMonth: string = ''
  selectedYear: number = 0
  recordsLoaded: boolean = false

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private routeService: RouteService,
    private userService: UserService,
    private appointmentRecordService: AppointmentRecordService
  ) {}

  async ngOnInit() {
    this.routeService.updateSideBarRoute()

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.id = id!
    })

    try {
      const user = await this.auth.checkUser().toPromise()
      if(this.id !== user!.id && user!.access_level < 2) {
        throw new Error("Cannot access here")
      }
      this.authenticated = true
    } catch (error) {
      this.auth.logout()
    }

    this.selectedYear = new Date().getFullYear()
    this.selectedMonth = this.monthsAvailable[new Date().getMonth()]

    this.getMonthRecord()

    const [ dashboardUser, recordsUnverified ] = await Promise.all([
      this.userService.getUser(this.id).toPromise(),
      this.appointmentRecordService.getUnverifiedByUser(this.id).toPromise()
    ])

    this.dashboardUsername = dashboardUser!.name
    const { appointmentsUnverifiedAsPsy, appointmentsUnverifiedAsSup } = recordsUnverified!
    this.appointmentsUnverified = {
      appointmentsUnverifiedAsPsy,
      appointmentsUnverifiedAsSup
    }

    this.recordsLoaded = true
    this.pageLoaded = true
  }

  onMonthSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    this.selectedMonth = target.value

    this.getMonthRecord()
  }

  onYearSelected(event: Event) {
    const target = event.target as HTMLSelectElement
    this.selectedYear = parseInt(target.value)

    this.getMonthRecord()
  }

  async getMonthRecord() {
    const monthRecord = await this.appointmentRecordService
      .getUserMonth(this.id, this.selectedMonth, this.selectedYear).toPromise()
    const { psyRecords, supRecords, salaryAsPsy, salaryAsSup } = monthRecord!
    const salaryFormatted = this.formatSalary((salaryAsPsy + salaryAsSup))

    this.monthRecord = {
      psyRecords,
      supRecords,
      salaryAsPsy,
      salaryAsSup,
      totalSalary: salaryFormatted
    }

    this.monthRecord.psyRecords.map((record) => {
      record.appointment_date = this.formatDate(record.appointment_date)
    })
    this.monthRecord.supRecords.map((record) => {
      record.appointment_date = this.formatDate(record.appointment_date)
    })
  }

  formatDate(date: string) {
    const formattedDate = date.split("T")[0]
    const day = formattedDate.split("-")[2]
    const month = formattedDate.split("-")[1]
    const year = formattedDate.split("-")[0]

    date = `${day}/${month}/${year}`

    return date
  }

  formatSalary(totalSalary: number): number {
    let totalSalaryAsString = (totalSalary).toString()
    const dotIndex = totalSalaryAsString.toString().indexOf(".")
    let salaryFormatted = 0
    if(dotIndex >= 0 ) {
      salaryFormatted = parseFloat(totalSalaryAsString.slice(0, dotIndex + 3))
    } else {
      salaryFormatted = parseFloat(totalSalaryAsString)
    }
    return salaryFormatted
  }
}
