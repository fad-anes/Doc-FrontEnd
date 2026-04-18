import { Component } from '@angular/core';
import { DoctorService } from '../Service/DoctorService';
import { Doctor } from '../Model/Doctor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent {
  form!: FormGroup;
  selectedFile!: File;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
      private fb: FormBuilder,
      private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]]
      });
    }
onFileSelected(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        if (!file.type.startsWith('image/')) {
          this.errorMessage = 'Le fichier doit être une image';
          return;
        }
  
        if (file.size > 2 * 1024 * 1024) {
          this.errorMessage = 'Image trop volumineuse (max 2MB)';
          return;
        }
  
        this.selectedFile = file;
        this.errorMessage = '';
      }
    }
  
    onSubmit() {
  
      this.errorMessage = '';
      this.successMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
  
      if (!this.selectedFile) {
        this.errorMessage = 'Veuillez sélectionner une image';
        return;
      }
      this.isLoading = true;
      const doctor: Doctor = this.form.value;
  
      this.doctorService.AddDoctor(doctor, this.selectedFile).subscribe({
        next: (res) => {
          this.successMessage = 'Compte créé avec succès , veuillez attendre que l’administrateur confirme votre compte.✅';
          this.form.reset();
          this.isLoading = false; 
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
