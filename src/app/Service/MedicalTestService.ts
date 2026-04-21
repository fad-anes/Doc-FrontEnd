import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalTest } from '../Model/MedicalTest';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class MedicalTestService {
    apiUrl = 'http://localhost:8085/medicalTest';
    constructor(private http: HttpClient, private router: Router) { }

    AddPrescription(idLaboratory:number,idPatient:number,idDoctor:number,description:string): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Add",{idLaboratory:idLaboratory,idPatient:idPatient,idDoctor:idDoctor,description:description});                 
    }
    
    retrieveAllMedicalTest(id:number,role:string): Observable<MedicalTest[]>{
        return this.http.get<MedicalTest[]>(`${this.apiUrl}/All/${id}/${role}`);
    }
    
    ChangeStatusMedicalTest(id:number,file: File): Observable<any>{
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.put<any>(`${this.apiUrl}/Result/${id}`,formData);                 
    }
}