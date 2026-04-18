import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
isPatientIn:boolean;
  isMedecinIn:boolean;
  isPahamacieIn:boolean;
  isLaboratoireIn:boolean;
  userInfo:any;

constructor(private authService:AuthService){}

ngOnInit():void{
  const role=sessionStorage.getItem('role');
  if(role==='LABORATORY'){
    this.isLaboratoireIn=true;
    this.isMedecinIn=false;
    this.isPahamacieIn=false;
    this.isPatientIn=false;
  }
  else if(role==='DOCTOR'){
    this.isMedecinIn=true;
    this.isLaboratoireIn=false;
    this.isPahamacieIn=false;
    this.isPatientIn=false;
  }
  else if(role==='PHARMACY'){
    this.isPahamacieIn=true;
    this.isLaboratoireIn=false;
    this.isMedecinIn=false;
    this.isPatientIn=false;

  }
  else if(role==='PATIENT'){
    this.isPatientIn=true;
    this.isLaboratoireIn=false;
    this.isMedecinIn=false;
    this.isPahamacieIn=false;
  } 
  this.userInfo=this.authService.getDetails();
}

logout(){
  this.authService.logout();
}
}
