import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../Interface/Appointment';
import { appointmentCreateDTO } from '../Interface/AppointmentsCreate';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  userID: string = localStorage.getItem('userID') || ''
  baseApiURL: string = environment.baseApiURL

  constructor(private http: HttpClient) {}

  create(appointment: appointmentCreateDTO) {
    return this.http.post<Appointment>
      (`${this.baseApiURL}/appointment`, { appointment })
  }

  listAppointmentsAsPsychologist(id?: string): Observable<Appointment[]> {
    if(!id)
      id = this.userID

    return this.http.get<Appointment[]>
      (`${this.baseApiURL}/appointment/${id}/psychologist`)
  }

  listAppointmentsAsSupervisor(id?: string): Observable<Appointment[]> {
    if(!id)
      id = this.userID

    return this.http.get<Appointment[]>
      (`${this.baseApiURL}/appointment/${id}/supervisor`)
  }

  listPatientAppointments(id: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>
      (`${this.baseApiURL}/appointment/${id}/patient`)
  }
}