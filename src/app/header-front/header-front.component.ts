import { Component } from '@angular/core';
import { AuthService } from '../Service/AuthService';
import { NotificationService } from '../Service/NotificationService';
import { Notification } from '../Model/Notification';


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
  showNotifications = false;
  showPopup = false;
  not!:Notification;
  notifications : Notification[] = [];

constructor(private authService:AuthService, private notificationService:NotificationService){}

ngOnInit():void{
  const role=localStorage.getItem('role');
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
  this.loadNotifications(this.userInfo.id, this.userInfo.role);
}
loadNotifications(userId: number, userType: string) {
    this.notificationService.getAllNotificationsByUser(userId, userType).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
get unseenCount(): number {
    return this.notifications.filter(n => !n.seen).length;
  }

deleteNotification(id: number) {
    this.notificationService.DeleteNotification(id).subscribe({
      next: () => {
        location.reload(); 
      },
      error: () => location.reload()
    });
}

logout(){
  this.authService.logout();
}
detailNot(n:Notification){
  this.not=n;
   this.notificationService.MarkSeen(n.id).subscribe({
      next: () => {
        this.loadNotifications(this.userInfo.id, this.userInfo.role);
      },
      error: () => {
        this.loadNotifications(this.userInfo.id, this.userInfo.role);
      }
    });
    this.showPopup=true;
}
hidepoup(){
  this.showPopup=false;
  this.not=null;
}
}
