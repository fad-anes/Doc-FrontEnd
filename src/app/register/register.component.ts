import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
selectedRole: string | null = null;

  selectRole(role: string) {
    this.selectedRole = role;
  }
}
