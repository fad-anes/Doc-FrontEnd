import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pharmacy } from '../Model/Pharmacy';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class PharmacyService {
    apiUrl = 'http://localhost:8085/pharmacy';
    constructor(private http: HttpClient, private router: Router) { }

    AddPharmacy(pharmacie:Pharmacy,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('name', pharmacie.name);
        formData.append('address', pharmacie.address);
        formData.append('email', pharmacie.email);
        formData.append('password', pharmacie.password);
        formData.append('phone', pharmacie.phone);
        formData.append('file', file);
        return this.http.post<any>(this.apiUrl+"/Add",formData);                 
    }
    UpdatePharmacyWithimage(pharmacie:Pharmacy,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('name', pharmacie.name);
        formData.append('address', pharmacie.address);
        formData.append('email', pharmacie.email);
        formData.append('password', pharmacie.password);
        formData.append('phone', pharmacie.phone);
        formData.append('file', file);
        return this.http.put<any>(`${this.apiUrl}/UpdateWithImage/${pharmacie.id}`,formData);                 
    }
    UpdatePharmacy(pharmacy:Pharmacy): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",pharmacy);                 
    }
    retrievepharmacy(email: string): Observable<Pharmacy>{
        return this.http.get<Pharmacy>(`${this.apiUrl}/One/${email}`);
    }
    retrieveAllPharmacy(): Observable<Pharmacy[]>{
        return this.http.get<Pharmacy[]>(`${this.apiUrl}/All`);
    }
    DeletePharmacy(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    ChangeStatusPharmacy(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,null);
    }
}