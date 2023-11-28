import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../Interface/Appointment';
import { MonthRecord } from '../Interface/MonthRecord';
import { RecordsUnverified } from '../Interface/RecordsUnverified';
import { AppointmentRecord } from '../Interface/AppointmentRecord';
import { UpdateRecord } from '../Interface/UpdateRecord';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRecordService {
  baseApiURL: string = environment.baseApiURL

  constructor(private http: HttpClient) { }

  createRecord(id: string, payload: any ) {
    return this.http.post<Appointment>
      (`${this.baseApiURL}/appointmentrecord/${id}`, { appointment: payload })
  }

  updateRecord(id: string, payload: UpdateRecord ) {
    console.log(payload)
    return this.http.put<UpdateRecord>
      (`${this.baseApiURL}/appointmentrecord/${id}`, { appointment: payload })
  }

  getRecord(id: string) {
    return this.http.get<AppointmentRecord>
      (`${this.baseApiURL}/appointmentrecord/${id}`)
  }

  verify(id: string) {
    return this.http.post<Appointment[]>
      (`${this.baseApiURL}/appointmentrecord/verify/${id}`, {})
  }

  getUnverifiedByUser(id: string) {
    return this.http.get<RecordsUnverified>
      (`${this.baseApiURL}/appointmentrecord/unverified/${id}`)
  }

  getUserMonth(id: string, month: string, year: number) {
    return this.http.get<MonthRecord>
      (`${this.baseApiURL}/appointmentrecord/${id}/${month}/${year}`)
  }

  getAllUnverified() {
    return this.http.get<AppointmentRecord[]>
      (`${this.baseApiURL}/appointmentrecord/unverified`)
  }
}
