import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import { NotificationService } from '../Service/NotificationService';
import { Notification } from '../Model/Notification';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css']
})
export class HeaderBackComponent {
  isDropdownOpen: boolean = false;
  user:any;
  notifications: Notification[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService:NotificationService
  ) {}

   toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // ← parenthèses ajoutées
    });
  }

  // Fermer le menu si on clique en dehors
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-user')) {
      this.isDropdownOpen = false;
    }
  }

  handleNotif(notif: any): void {
    if (notif.type === 'MESSAGE') {
      this.router.navigate(['/admin/messages']);
    } else if (notif.type === 'ACTIVATION') {
      this.router.navigate(['/admin/activations']);
    } else {
      console.log('📢 Notification non reconnue :', notif);
    }
  }
  
}
