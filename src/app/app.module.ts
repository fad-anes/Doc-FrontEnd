import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { HeaderFrontComponent } from './header-front/header-front.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PharmacyRegisterComponent } from './pharmacy-register/pharmacy-register.component';
import { LaboratoryRegisterComponent } from './laboratory-register/laboratory-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoaderComponent } from './loader/loader.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { PofilePatientComponent } from './pofile-patient/pofile-patient.component';
import { PofileDoctorComponent } from './pofile-doctor/pofile-doctor.component';
import { PofileLabComponent } from './pofile-lab/pofile-lab.component';
import { PofilePharmaComponent } from './pofile-pharma/pofile-pharma.component';
import { DayOffComponent } from './day-off/day-off.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientFolderComponent } from './patient-folder/patient-folder.component';
import { PatientPersonalInfoComponent } from './patient-personal-info/patient-personal-info.component';
import { DoctorMedicalTestsComponent } from './doctor-medical-tests/doctor-medical-tests.component';
import { DoctorPrescriptionComponent } from './doctor-prescription/doctor-prescription.component';
import { MedicalTestComponent } from './medical-test/medical-test.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { LabsListComponent } from './labs-list/labs-list.component';
import { PharmsListComponent } from './pharms-list/pharms-list.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DoctorRegisterComponent,
    PatientRegisterComponent,
    PharmacyRegisterComponent,
    LaboratoryRegisterComponent,
    DashboardComponent,
    AcceuilComponent,
    LoaderComponent,
    LayoutComponent,
    ProfileAdminComponent,
    ResetPasswordComponent,
    ProfileComponent,
    PofilePatientComponent,
    PofileDoctorComponent,
    PofileLabComponent,
    PofilePharmaComponent,
    DayOffComponent,
    AppointmentComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    PatientsComponent,
    PatientFolderComponent,
    PatientPersonalInfoComponent,
    DoctorMedicalTestsComponent,
    DoctorPrescriptionComponent,
    MedicalTestComponent,
    PrescriptionComponent,
    DoctorsListComponent,
    PatientListComponent,
    LabsListComponent,
    PharmsListComponent,
    ChatComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    NgxPaginationModule,
    FullCalendarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
