import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/AuthService';
import { NotificationService } from '../Service/NotificationService';
import { AdminService } from '../Service/AdminService';
import { Notification } from '../Model/Notification';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
 constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService, private adminService: AdminService) {}

  isSidebarCollapsed = false;
  showNotifications = false;
  showProfileMenu = false;
  user!: any;
  notifications : Notification[] = [];
  
  ngOnInit() {
    this.adminService.retrieveAdmin(sessionStorage.getItem('email')!).subscribe((admin) => {
      this.user = admin;
      this.loadNotifications(admin.id, 'ADMIN');
    });
   
    
  }

  loadNotifications(userId: number, userType: string) {
    this.notificationService.getAllNotificationsByUser(userId, userType).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfileMenu = false;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
  }

  get unseenCount(): number {
    return this.notifications.filter(n => !n.seen).length;
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }
}
