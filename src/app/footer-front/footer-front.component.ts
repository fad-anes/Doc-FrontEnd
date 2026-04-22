import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';

@Component({
  selector: 'app-footer-front',
  templateUrl: './footer-front.component.html',
  styleUrls: ['./footer-front.component.css']
})
export class FooterFrontComponent {
constructor(private authService:AuthService){}
logout(){
  this.authService.logout();
}
}
