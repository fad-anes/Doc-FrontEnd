import { Component, Input } from '@angular/core';
import { Prescription } from '../Model/Prescription';
import { Patient } from '../Model/Patient';
import { Pharmacy } from '../Model/Pharmacy';
import { AuthService } from '../Service/AuthService';
import { PrescriptionService } from '../Service/PrescriptionService';
import { PatientService } from '../Service/PatientService';
import { PharmacyService } from '../Service/PharmacyService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.css']
})
export class DoctorPrescriptionComponent {
  @Input() prescriptions: Prescription[];
  selectedPrescription!: Prescription;
  patients: Patient[] = [];
  pharmacys: Pharmacy[] = [];
  user!: any;
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  popupForm: boolean = false;
  popupDetails: boolean = false;

  constructor(
      private fb: FormBuilder,
      private prescriptionService: PrescriptionService,
      private patientService: PatientService,
      private pharmacyService: PharmacyService,
      private authService: AuthService
    ) {}

    
   ngOnInit(): void {
    this.user = this.authService.getDetails();
     this.form = this.fb.group({
      idPharmacy: ['', Validators.required],
      idPatient: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.loadPatients();
    this.loadPharmacys();
  }

  loadPatients() {
    this.patientService.retrieveAllPatient().subscribe(res => {
      this.patients = res;
    });
  }
  loadPharmacys() {
    this.pharmacyService.retrieveAllPharmacy().subscribe(res => {
      this.pharmacys = res;
    });
  }
  showPopupForm(){
    this.popupForm=true;
  }
  HidePopupForm(){
    this.popupForm=false;
  }
   showPopupdetails(p:Prescription){
    this.selectedPrescription=p;
    this.popupDetails=true;
  }
  HidePopupdetails(){
    this.popupDetails=false;
    this.selectedPrescription=null;
  }

  onSubmit(){
    this.errorMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading=true;
      this.prescriptionService.AddPrescription(this.form.get('idPharmacy')?.value,this.form.get('idPatient')?.value,this.user.id,this.form.get('description')?.value).subscribe({
          next: (res) => {
            location.reload();
          },
    
          error: (err) => {
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
