import { Component } from '@angular/core';
import { DoctorService } from '../Service/DoctorService';
import { Doctor } from '../Model/Doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent {
doctors: Doctor[] = [];
isLoading: boolean = false;
constructor(
    private doctorService: DoctorService
  ) {}
  ngOnInit(): void {
    this.loadDoctors();
  }
 loadDoctors() {
    this.doctorService.retrieveAllDoctor().subscribe(res => {
      this.doctors = res;
    });
}
  OnChangeStatus(id:number){
    this.isLoading = true;
    this.doctorService.ChangeStatusDoctor(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadDoctors(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }

   OnDelete(id:number){
    this.isLoading = true;
    this.doctorService.DeleteDoctor(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadDoctors(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }
}
