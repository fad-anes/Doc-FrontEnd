import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { HeaderFrontComponent } from './header-front/header-front.component';
import { HeaderBackComponent } from './header-back/header-back.component';
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



@NgModule({
  declarations: [
    AppComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HeaderBackComponent,
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
    PofilePharmaComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
