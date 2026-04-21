import { Component } from '@angular/core';
import { LaboratoryService } from '../Service/LaboratoryService';
import { Laboratory } from '../Model/Laboratory';

@Component({
  selector: 'app-labs-list',
  templateUrl: './labs-list.component.html',
  styleUrls: ['./labs-list.component.css']
})
export class LabsListComponent {
  laboratorys: Laboratory[] = [];
  isLoading: boolean = false;
constructor(
    private laboratoryService: LaboratoryService
  ) {}
  ngOnInit(): void {
    this.loadLaboratorys();
  }
 loadLaboratorys() {
    this.laboratoryService.retrieveAllLaboratory().subscribe(res => {
      this.laboratorys = res;
    });
}
  OnChangeStatus(id:number){
    this.isLoading = true;
    this.laboratoryService.ChangeStatusLaboratory(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadLaboratorys(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }

   OnDelete(id:number){
    this.isLoading = true;
    this.laboratoryService.DeleteLaboratory(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadLaboratorys(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }
}
