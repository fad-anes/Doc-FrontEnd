import { Component } from '@angular/core';
import { LaboratoryService } from '../Service/LaboratoryService';
import { Laboratory } from '../Model/Laboratory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laboratory-register',
  templateUrl: './laboratory-register.component.html',
  styleUrls: ['./laboratory-register.component.css']
})
export class LaboratoryRegisterComponent {
  form!: FormGroup;
  selectedFile!: File;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
      private fb: FormBuilder,
      private laboratoryService: LaboratoryService
  ) {}


   ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
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
      const laboratory: Laboratory = this.form.value;
  
      this.laboratoryService.AddLaboratory(laboratory, this.selectedFile).subscribe({
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
