import { Component } from '@angular/core';
import { PatientService } from '../Service/PatientService';
import { Patient } from '../Model/Patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
patients: Patient[] = [];
isLoading: boolean = false;
constructor(
    private patientService: PatientService
  ) {}
  ngOnInit(): void {
    this.loadPatients();
  }
 loadPatients() {
    this.patientService.retrieveAllPatient().subscribe(res => {
      this.patients = res;
    });
}
  OnChangeStatus(id:number){
    this.isLoading = true;
    this.patientService.ChangeStatusPatient(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadPatients(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }

   OnDelete(id:number){
    this.isLoading = true;
    this.patientService.DeletePatient(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadPatients(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }
}
