import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../Service/AdminService';
import { Admin } from '../Model/Admin';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent {

  form!: FormGroup;
  ad!: Admin;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
      private fb: FormBuilder,
      private adminService: AdminService
    ) {}

    ngOnInit(): void {

  this.form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  this.isLoading = true;

  this.adminService.retrieveAdmin(localStorage.getItem('email')!)
    .subscribe((admin) => {
      this.ad = admin;
      this.form.patchValue({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email
      });

      this.isLoading = false;
    });
}

  onSubmit() {
  
      this.errorMessage = '';
      this.successMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading=true;
      const admin: Admin = this.form.value;
      admin.id = this.ad.id;
  
      this.adminService.UpdateAdmin(admin).subscribe({
        next: (res) => {
          this.successMessage = 'Profil mis à jour avec succès !✅';
          localStorage.setItem('email', this.form.get('email')?.value);
          this.isLoading=false;
          location.reload();
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
  
    isInvalid(field: string): boolean {
      const control = this.form.get(field);
      return !!(control && control.invalid && control.touched);
    }

}
