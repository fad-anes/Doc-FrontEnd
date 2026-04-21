import { Component } from '@angular/core';
import { PharmacyService } from '../Service/PharmacyService';
import { Pharmacy } from '../Model/Pharmacy';

@Component({
  selector: 'app-pharms-list',
  templateUrl: './pharms-list.component.html',
  styleUrls: ['./pharms-list.component.css']
})
export class PharmsListComponent {
pharmacys: Pharmacy[] = [];
isLoading: boolean = false;
constructor(
    private pharmacyService: PharmacyService
  ) {}
  ngOnInit(): void {
    this.loadPharmacys();
  }
 loadPharmacys() {
    this.pharmacyService.retrieveAllPharmacy().subscribe(res => {
      this.pharmacys = res;
    });
}
  OnChangeStatus(id:number){
    this.isLoading = true;
    this.pharmacyService.ChangeStatusPharmacy(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadPharmacys(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }

   OnDelete(id:number){
    this.isLoading = true;
    this.pharmacyService.DeletePharmacy(id).subscribe({
      next: () => {
        this.isLoading=false;
        this.loadPharmacys(); 
      },
      error: (err) => {
        location.reload();
      }
    });
  }
}
