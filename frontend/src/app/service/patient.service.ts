import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Patient } from '../Interface/Patient';
import { createPatient } from '../Interface/CreatePatient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseApiURL: string = environment.baseApiURL

  constructor(private http: HttpClient) {}

  create(patient: createPatient): Observable<Patient> {
    return this.http.post<Patient>
      (`${this.baseApiURL}/patient`, { patient })
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>
      (`${this.baseApiURL}/patient/${id}`)
  }

  listPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>
      (`${this.baseApiURL}/patient/enabled`)
  }
}
