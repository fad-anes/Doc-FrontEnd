import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Prescription } from '../Model/Prescription';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class PrescriptionService {
    apiUrl = 'http://localhost:8085/prescription';
    constructor(private http: HttpClient, private router: Router) { }

    AddPrescription(idPharmacy:number,idPatient:number,idDoctor:number,description:string): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Add",{idPharmacy:idPharmacy,idPatient:idPatient,idDoctor:idDoctor,description:description});                 
    }
    
    retrieveAllPrescription(id:number,role:string): Observable<Prescription[]>{
        return this.http.get<Prescription[]>(`${this.apiUrl}/All/${id}/${role}`);
    }
    
    ChangeStatusPrescription(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/ChangeStatus/${id}`,null);
    }
   
}