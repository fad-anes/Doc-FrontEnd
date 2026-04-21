import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';
import { PatientService } from '../Service/PatientService';
import { Patient } from '../Model/Patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
patients : Patient[] = [];
userInfo:any;
constructor(private authService:AuthService, private patientService:PatientService, private router: Router){}

ngOnInit():void{
  this.userInfo=this.authService.getDetails();
  this.loadPatients(this.userInfo.id);
}
loadPatients(userId: number) {
    this.patientService.AllByDoctor(userId).subscribe((ps: Patient[]) => {
      this.patients = ps;
    });
  }
}
