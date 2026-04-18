import { Component } from '@angular/core';
import { PatientService } from '../Service/PatientService';
import { Patient } from '../Model/Patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {

    form!: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
    isLoading: boolean = false;
  
    constructor(
        private fb: FormBuilder,
        private patientService: PatientService
    ) {}

     ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]]
      });
    }

    onSubmit() {
      
          this.errorMessage = '';
          this.successMessage = '';
      
          if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
          }
          this.isLoading= true;
          const patient: Patient = this.form.value;
      
          this.patientService.AddPatient(patient).subscribe({
            next: (res) => {
              this.successMessage = 'Compte créé avec succès , veuillez attendre que l’administrateur confirme votre compte.✅';
              this.form.reset();
              this.isLoading= false;
            },
      
            error: (err) => {
              console.error(err);
              this.isLoading= false;
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
