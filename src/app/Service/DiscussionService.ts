import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Discussion } from '../Model/Discussion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  apiUrl = 'http://localhost:8085/discussions';

  constructor(private http: HttpClient) {}

  createDiscussion(patientId: number, doctorId: number): Observable<Discussion> {
    return this.http.post<Discussion>(
      `${this.apiUrl}/create?patientId=${patientId}&doctorId=${doctorId}`,
      {}
    );
  }

  getDiscussions(id: number, role: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/${id}/${role}`);
  }

  deleteDiscussion(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}