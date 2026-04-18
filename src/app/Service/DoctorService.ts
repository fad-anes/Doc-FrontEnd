import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../Model/Doctor';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class DoctorService {
    apiUrl = 'http://localhost:8085/api/doctor';
    constructor(private http: HttpClient, private router: Router) { }

    AddDoctor(doctor:Doctor,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('firstName', doctor.firstName);
        formData.append('lastName', doctor.lastName);
        formData.append('address', doctor.address);
        formData.append('email', doctor.email);
        formData.append('password', doctor.password);
        formData.append('phone', doctor.phone);
        formData.append('file', file);
        return this.http.post<any>(this.apiUrl+"/Add",formData);                 
    }
    UpdateDoctorWithimage(doctor:Doctor,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('firstName', doctor.firstName);
        formData.append('lastName', doctor.lastName);
        formData.append('address', doctor.address);
        formData.append('email', doctor.email);
        formData.append('password', doctor.password);
        formData.append('phone', doctor.phone);
        formData.append('file', file);
        return this.http.put<any>(`${this.apiUrl}/UpdateWithImage/${doctor.id}`,formData);                 
    }
    UpdateDoctor(doctor:Doctor): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",doctor);                 
    }
    retrieveDoctor(email: string): Observable<Doctor>{
        return this.http.get<Doctor>(`${this.apiUrl}/One/${email}`);
    }
    retrieveAllDoctor(): Observable<Doctor[]>{
        return this.http.get<Doctor[]>(`${this.apiUrl}/All`);
    }
    DeleteDoctor(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    ChangeStatusDoctor(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,null);
    }
}