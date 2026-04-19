import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

   role!: string;

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role') || '';
  }

}
