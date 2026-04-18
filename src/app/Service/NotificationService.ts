import { Injectable } from '@angular/core';
import { Notification } from '../Model/Notification';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class NotificationService {
    apiUrl = 'http://localhost:8085/api/notification';
    constructor(private http: HttpClient) { }

    MarkSeen(id:number): Observable<any>{
        return this.http.put<any>(`${this.apiUrl}/seen/${id}`, null);                 
    }

    getAllNotificationsByUser(id: number,type:string): Observable<Notification[]>{
        return this.http.get<Notification[]>(`${this.apiUrl}/${id}/${type}`);
    }
     DeleteNotification(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}