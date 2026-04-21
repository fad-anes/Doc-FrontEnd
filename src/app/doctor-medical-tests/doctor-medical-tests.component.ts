import { Component,Input } from '@angular/core';
import { MedicalTest } from '../Model/MedicalTest';
import { Patient } from '../Model/Patient';
import { Laboratory } from '../Model/Laboratory';
import { AuthService } from '../Service/AuthService';
import { MedicalTestService } from '../Service/MedicalTestService';
import { PatientService } from '../Service/PatientService';
import { LaboratoryService } from '../Service/LaboratoryService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-medical-tests',
  templateUrl: './doctor-medical-tests.component.html',
  styleUrls: ['./doctor-medical-tests.component.css']
})
export class DoctorMedicalTestsComponent {
@Input() medicalTests: MedicalTest[];
  selectedMedicalTest!: MedicalTest;
  patients: Patient[] = [];
  laboratorys: Laboratory[] = [];
  user!: any;
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  popupForm: boolean = false;
  popupDetails: boolean = false;
  showPdf: boolean = false;
  safePdfUrl!: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private medicalTestService: MedicalTestService,
    private patientService: PatientService,
    private laboratoryService: LaboratoryService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

   ngOnInit(): void {
      this.user = this.authService.getDetails();
       this.form = this.fb.group({
        idLaboratory: ['', Validators.required],
        idPatient: ['', Validators.required],
        description: ['', Validators.required]
      });
      this.loadPatients();
      this.loadLaboratorys();
    }
  
    loadPatients() {
      this.patientService.retrieveAllPatient().subscribe(res => {
        this.patients = res;
      });
    }
    loadLaboratorys() {
      this.laboratoryService.retrieveAllLaboratory().subscribe(res => {
        this.laboratorys = res;
      });
    }
    showPopupForm(){
      this.popupForm=true;
    }
    HidePopupForm(){
      this.popupForm=false;
    }
     showPopupdetails(m:MedicalTest){
      this.selectedMedicalTest=m;
      this.popupDetails=true;
    }
    HidePopupdetails(){
      this.popupDetails=false;
      this.selectedMedicalTest=null;
    }

    onSubmit(){
    this.errorMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading=true;
      this.medicalTestService.AddPrescription(this.form.get('idLaboratory')?.value,this.form.get('idPatient')?.value,this.user.id,this.form.get('description')?.value).subscribe({
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

    showp(url:string){
  this.showPdf=true;
  this.popupDetails=false;
  this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
} 
closesp(){
  this.showPdf=false;
  this.safePdfUrl=null;
  this.popupDetails=true;
}
}
