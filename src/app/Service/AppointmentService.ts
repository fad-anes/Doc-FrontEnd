import { Injectable } from '@angular/core';
import { Appointment } from '../Model/Appointment';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class AppointmentService {
    apiUrl = 'http://localhost:8085/appointment';
    constructor(private http: HttpClient) { }

    AddAppointment(appointment:Appointment): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Add",appointment);                 
    }
    UpdateAppointment(appointment:Appointment): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",appointment);                 
    }
    PayAppointment(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/Pay/${id}`,null);
    }
    ChangeStatus(id: number,status: string): Observable<any>{
        return this.http.put(`${this.apiUrl}/ChangeStatus/${id}/${status}`,null);
    }
    retrieveAllAppointment(id: number,role:string): Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${this.apiUrl}/All/${id}/${role}`);
    }
   createStripeSession(id: number) {
  return this.http.post(
    `http://localhost:8085/create-checkout-session/${id}`,
    {},
    { responseType: 'text' }
  );
}
}