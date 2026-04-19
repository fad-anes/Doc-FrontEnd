import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';
import { Otp } from '../Model/Otp';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  showInput: boolean = false;
  number: string = '';
  password: string = '';
  email: string = '';

  constructor(
      private authService: AuthService
    ) {}

  
  isEmailInvalid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.email) || this.email === ''){
      return true;
    }
    return false;
  }
  isPasswordInvalid(): boolean {
    if(this.password.length < 6 || this.password === ''){
      return true;
    }
    return false;
  }
  isNumberInvalid(): boolean {
    if(this.number.length < 6 || this.number === ''){
      return true;
    }
    return false;
  }

  onSubmit() {
    
        this.errorMessage = '';
        this.successMessage = '';
        if(!this.showInput){
           if (this.isEmailInvalid()) {
             return;
           }
            this.isLoading=true;
            this.authService.DemandCodeVerification(this.email).subscribe({
              next: (res) => {
                this.successMessage = 'Code de vérification envoyé avec succès !✅';
                this.showInput = true;
                this.isLoading=false;
              },
        
              error: (err) => {
                console.error(err);
                this.isLoading=false;
                if (err.error) {
                  this.errorMessage = err.error;
                } else {
                  this.errorMessage = 'Une erreur est survenue';
                }
              }
            });
            return;
          }

        if (this.isEmailInvalid() || this.isPasswordInvalid() || this.isNumberInvalid()) {
          return;
        }
        this.isLoading=true;
        const otp: Otp = { email: this.email, password: this.password, number: this.number };
       
    
        this.authService.ChangePassword(otp).subscribe({
          next: (res) => {
            this.successMessage = 'Mot de passe réinitialisé avec succès !✅';
            this.isLoading=false;
          },
    
          error: (err) => {
            console.error(err);
            this.isLoading=false;
            if (err.error) {
              this.errorMessage = err.error;
            } else {
              this.errorMessage = 'Une erreur est survenue';
            }
          }
        });
      }
}
