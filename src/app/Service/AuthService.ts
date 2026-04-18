import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = 'http://localhost:8085/api';

  constructor(private router: Router, private http: HttpClient) {}

  getDetails(): any | null {
    return { token: sessionStorage.getItem('currentUser'), email: sessionStorage.getItem('email'), role: sessionStorage.getItem('role'), id: sessionStorage.getItem('id') };
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + "/login", { email, password }, { responseType: 'text' })
      .pipe(
        map((token: string) => {

          if (token) {
            const decoded: any = jwtDecode(token);

            sessionStorage.setItem('currentUser', token);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('role', decoded.role);
            sessionStorage.setItem('id', decoded.id);
            return decoded.role;
          }

          return token;
        })
      );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn(){
        let token=sessionStorage.getItem("currentUser");
        if (token){
        return true;
        }else{
        return false
        }
   }
}