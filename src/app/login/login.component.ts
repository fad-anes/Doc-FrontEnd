import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}
  
  
     ngOnInit(): void {
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
        });
      }

       onSubmit() {
        
            this.errorMessage = '';
            this.successMessage = '';
        
            if (this.form.invalid) {
              this.form.markAllAsTouched();
              return;
            }
            this.isLoading = true;
        
            this.authService.login(this.form.get('email')?.value, this.form.get('password')?.value).subscribe({
              next: (res) => {
                this.isLoading = false;
                if(res =='ADMIN'){
                  this.router.navigate(['/dashboard']);
                }else{
                  this.router.navigate(['/acceuil']);
                }
              },
        
              error: (err) => {
                console.error(err);
                this.isLoading = false;   
                if (err.error) {
                  this.errorMessage = err.error;
                } else {
                  this.errorMessage = 'Une erreur est survenue';
                }
              }
            });
          }
        
          isInvalid(field: string): boolean {
            const control = this.form.get(field);
            return !!(control && control.invalid && control.touched);
          }
}
