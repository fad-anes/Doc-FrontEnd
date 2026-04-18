import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../Model/Patient';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class PatientService {
    apiUrl = 'http://localhost:8085/api/patient';
    constructor(private http: HttpClient, private router: Router) { }

    AddPatient(user:Patient): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Add",user);                 
    }
    UpdatePatient(user:Patient): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",user);                 
    }
    retrievePatient(email: string): Observable<Patient>{
        return this.http.get<Patient>(`${this.apiUrl}/One/${email}`);
    }
    retrieveAllPatient(): Observable<Patient[]>{
        return this.http.get<Patient[]>(`${this.apiUrl}/All`);
    }
    DeletePatient(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    ChangeStatusPatient(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,null);
    }
}