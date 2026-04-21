import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Otp } from '../Model/Otp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = 'http://localhost:8085';

  constructor(private router: Router, private http: HttpClient) {}

  getDetails(): any | null {
    return { token: localStorage.getItem('currentUser'), email: localStorage.getItem('email'), role: localStorage.getItem('role'), id: localStorage.getItem('id'), name: localStorage.getItem('name') };
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + "/login", { email, password }, { responseType: 'text' })
      .pipe(
        map((token: string) => {

          if (token) {
            const decoded: any = jwtDecode(token);

            localStorage.setItem('currentUser', token);
            localStorage.setItem('email', email);
            localStorage.setItem('name', decoded.name);
            localStorage.setItem('role', decoded.role);
            localStorage.setItem('id', decoded.id);
            return decoded.role;
          }

          return token;
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn(){
        let token=localStorage.getItem("currentUser");
        if (token){
        return true;
        }else{
        return false
        }
   }

   DemandCodeVerification(email: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${email}`,null);
    }
    ChangePassword(otp:Otp): Observable<any>{
        return this.http.post<any>(this.apiUrl+"/ResetPassword",otp);                 
    }
}