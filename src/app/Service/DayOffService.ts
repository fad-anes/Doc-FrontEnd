import { Injectable } from '@angular/core';
import { DayOff } from '../Model/DayOff';
import {  Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class DayOffService {
    apiUrl = 'http://localhost:8085/dayOff';
    constructor(private http: HttpClient) { }

    AddDayOff(dayOff:DayOff): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Add",dayOff);                 
    }
    UpdateDayOff(dayOff:DayOff): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/Update",dayOff);                 
    }
    retrieveAllDaysByDoctor(id: number): Observable<DayOff[]>{
        return this.http.get<DayOff[]>(`${this.apiUrl}/${id}`);
    }
    DeleteDayOff(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}