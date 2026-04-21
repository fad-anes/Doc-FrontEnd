import { Component } from '@angular/core';
import { PatientService } from '../Service/PatientService';
import { Patient } from '../Model/Patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pofile-patient',
  templateUrl: './pofile-patient.component.html',
  styleUrls: ['./pofile-patient.component.css']
})
export class PofilePatientComponent {
    form!: FormGroup;
    pat!: Patient;
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

      this.patientService.retrievePatient(localStorage.getItem('email')!)
    .subscribe((patient) => {
      this.pat = patient;
      this.form.patchValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone
      });

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
      const patient: Patient = this.form.value;
      patient.id = this.pat.id;
  
      this.patientService.UpdatePatient(patient).subscribe({
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
