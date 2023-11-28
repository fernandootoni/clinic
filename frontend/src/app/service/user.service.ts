import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment';
import { User } from '../Interface/User';
import { CreateUser } from '../Interface/CreateUser';
import { UpdateUser } from '../Interface/UpdateUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiURL: string = environment.baseApiURL

  constructor(private http: HttpClient) {}

  createUser(user: CreateUser) {
    const payload = {
      user
    }
    
    return this.http.post<CreateUser>
      (`${this.baseApiURL}/user`, payload)
  }

  update(user: UpdateUser, id: string) {
    const payload = { 
      user
    } 

    return this.http.put<UpdateUser>
      (`${this.baseApiURL}/user/${id}`, payload)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseApiURL}/user/${id}`)
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseApiURL}/user`)
  }
}