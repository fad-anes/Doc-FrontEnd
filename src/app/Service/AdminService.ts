import { Injectable } from '@angular/core';
import { Admin } from '../Model/Admin';
import { DashboardDto } from '../Model/DashboardDto';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class AdminService {
    apiUrl = 'http://localhost:8085/admin';
    constructor(private http: HttpClient) { }

    UpdateAdmin(user:Admin): Observable<any>{
        return this.http.post<any>(this.apiUrl,user);                 
    }

    retrieveAdmin(email: string): Observable<Admin>{
        return this.http.get<Admin>(`${this.apiUrl}/${email}`);
    }
    Dashboard(): Observable<DashboardDto>{
        return this.http.get<DashboardDto>(`${this.apiUrl}/Dashboard`);
    }
}