import { Component } from '@angular/core';
import { Prescription } from '../Model/Prescription';
import { PrescriptionService } from '../Service/PrescriptionService';
import { AuthService } from '../Service/AuthService';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {
prescriptions: Prescription[];
user!: any;
isLoading: boolean = false;
ispharm: boolean = false;

constructor(
  private prescriptionService: PrescriptionService,
  private authService: AuthService
) {}

ngOnInit(): void {
  this.user = this.authService.getDetails();
  if(this.user.role==='PHARMACY'){
    this.ispharm=true;
  }
  this.prescriptionService.retrieveAllPrescription(this.user.id,this.user.role).subscribe(res => {
      this.prescriptions = res;
  });
}
changeStatus(id:number){
  this.isLoading=true;
  this.prescriptionService.ChangeStatusPrescription(id).subscribe({
    next: (res) => {
      location.reload();
    },
    error: (err) => {
      this.isLoading=false;
      if (err.error) {
        alert("⚠️"+err.error);
      } else {
        alert("⚠️ Une erreur est survenue");
      }
    }
  });
}
}
