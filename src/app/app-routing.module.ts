import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Service/AuthGuardService';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { DayOffComponent } from './day-off/day-off.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientFolderComponent } from './patient-folder/patient-folder.component';
import { MedicalTestComponent } from './medical-test/medical-test.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { LabsListComponent } from './labs-list/labs-list.component';
import { PharmsListComponent } from './pharms-list/pharms-list.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'acceuil',component:AcceuilComponent,canActivate:[AuthGuard]},
  {path:'profile-admin',component:ProfileAdminComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'day-off',component:DayOffComponent,canActivate:[AuthGuard]},
  {path:'appointment',component:AppointmentComponent,canActivate:[AuthGuard]},
  {path:'payment-success/:id', component: PaymentSuccessComponent },
  {path:'payment-cancel', component: PaymentCancelComponent },
  {path:'Mes-Patients',component:PatientsComponent,canActivate:[AuthGuard]},
  {path:'patient/:id',component:PatientFolderComponent,canActivate:[AuthGuard]},
  {path:'MedicalTest',component:MedicalTestComponent,canActivate:[AuthGuard]},
  {path:'Prescription',component:PrescriptionComponent,canActivate:[AuthGuard]},
  {path:'doctor-list',component:DoctorsListComponent,canActivate:[AuthGuard]},
  {path:'patient-list',component:PatientListComponent,canActivate:[AuthGuard]},
  {path:'lab-list',component:LabsListComponent,canActivate:[AuthGuard]},
  {path:'pharm-list',component:PharmsListComponent,canActivate:[AuthGuard]},
  {path:'chat',component:ChatComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
