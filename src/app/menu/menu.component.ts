import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
adminMenuOpen = false;
medecinMenuOpen = false;
patientMenuOpen = false;
laboratoireMenuOpen = false;
pharmacieMenuOpen = false;


// Méthodes pour toggle chaque menu
toggleAdminMenu() {
  this.adminMenuOpen = !this.adminMenuOpen;
}

toggleMedecinMenu() {
  this.medecinMenuOpen = !this.medecinMenuOpen;
}

togglePatientMenu() {
  this.patientMenuOpen = !this.patientMenuOpen;
}

toggleLaboratoireMenu() {
  this.laboratoireMenuOpen = !this.laboratoireMenuOpen;
}

togglePharmacieMenu() {
  this.pharmacieMenuOpen = !this.pharmacieMenuOpen;
}

}
