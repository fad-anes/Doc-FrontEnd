import { Component } from '@angular/core';
import { DashboardDto } from '../Model/DashboardDto';
import { AdminService } from '../Service/AdminService';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
dto!:DashboardDto;
constructor(
  private adminService: AdminService
) {}
ngOnInit(): void {
   this.adminService.Dashboard().subscribe(res => {
      this.dto = res;
    });
}
}
