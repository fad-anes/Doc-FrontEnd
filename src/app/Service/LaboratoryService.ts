import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Laboratory } from '../Model/Laboratory';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class LaboratoryService {
    apiUrl = 'http://localhost:8085/api/laboratory';
    constructor(private http: HttpClient, private router: Router) { }

    AddLaboratory(laboratory:Laboratory,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('name', laboratory.name);
        formData.append('address', laboratory.address);
        formData.append('email', laboratory.email);
        formData.append('password', laboratory.password);
        formData.append('phone', laboratory.phone);
        formData.append('file', file);
        return this.http.post<any>(this.apiUrl+"/Add",formData);                 
    }
    UpdateLaboratoryWithimage(laboratory:Laboratory,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('name', laboratory.name);
        formData.append('address', laboratory.address);
        formData.append('email', laboratory.email);
        formData.append('password', laboratory.password);
        formData.append('phone', laboratory.phone);
        formData.append('file', file);
        return this.http.put<any>(`${this.apiUrl}/UpdateWithImage/${laboratory.id}`,formData);                 
    }
    UpdateLaboratory(laboratory:Laboratory): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",laboratory);                 
    }
    retrieveLaboratory(email: string): Observable<Laboratory>{
        return this.http.get<Laboratory>(`${this.apiUrl}/One/${email}`);
    }
    retrieveAllLaboratory(): Observable<Laboratory[]>{
        return this.http.get<Laboratory[]>(`${this.apiUrl}/All`);
    }
    DeleteLaboratory(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    ChangeStatusLaboratory(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,null);
    }
}