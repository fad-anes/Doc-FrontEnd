import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../Service/AppointmentService';
import { DoctorService } from '../Service/DoctorService';
import { AuthService } from '../Service/AuthService';
import { Appointment } from '../Model/Appointment';
import { Doctor } from '../Model/Doctor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment!: Appointment;
  doctors: Doctor[] = [];
  ChosenDoctors: Doctor[] = [];
  user!: any;
  form!: FormGroup;
  speciality: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  showPopup: boolean = false;
  isPatient: boolean;
  mode: string = 'ajout';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

   ngOnInit(): void {
    this.user = this.authService.getDetails();
    this.isPatient = this.user.role === 'PATIENT';
    this.loadDoctors();
    this.loadAppointments();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      idDoctor: ['', Validators.required],
      consultationMode: ['EN_LIGNE', Validators.required]
    });
  }

  loadDoctors() {
    this.doctorService.retrieveAllDoctor().subscribe(res => {
      this.doctors = res;
    });
}

onSelectSpeciality() {
  this.ChosenDoctors = this.doctors.filter(doc => doc.speciality === this.speciality);
}

  loadAppointments() {
    this.appointmentService.retrieveAllAppointment(this.user.id, this.user.role).subscribe(res => {
      this.appointments = res;
      this.isLoading = false;
    }, error => {
      console.error('Error loading appointments:', error);
      
    });
}

showPopupForm(mode: string, appointment?: Appointment) {
    this.mode = mode;
    if (mode === 'modification' && appointment) {
      if(appointment.appointmentStatus != 'ATT'){
        alert("⚠️ Seuls les rendez-vous en attente peuvent être modifiés !");
        return;
      }
      this.selectedAppointment = appointment;
      for (let doc of this.doctors) {
        if (doc.id == appointment.doctor.id) {
          this.speciality = doc.speciality;
          this.onSelectSpeciality();
          break;
        }
      }
      this.form.patchValue({
        date: appointment.date,
        consultationMode: appointment.consultationMode,
        idDoctor: appointment.doctor.id
      });
    } else {
      this.form.reset();
    }
    this.showPopup = true;
  }

  hidePopup() {
    this.showPopup = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.form.reset();
    this.selectedAppointment=null;
  }


onSubmit() {
  
      this.errorMessage = '';
      this.successMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading=true;
      const appointment: Appointment = this.form.value;
      appointment.idPatient=this.user.id;
      if(this.mode === 'ajout'){
        this.appointmentService.AddAppointment(appointment).subscribe({
          next: (res) => {
            this.successMessage = 'Rendez-vous ajouté avec succès !✅';
            this.loadAppointments();
            this.isLoading=false;
            location.reload();
          },
    
          error: (err) => {
            console.error(err);
            this.isLoading=false;
            if (err.error) {
              this.errorMessage = err.error;
            } else {
              this.errorMessage = 'Une erreur est survenue';
            }
          }
        });
      }else if(this.mode === 'modification'){
        appointment.id=this.selectedAppointment.id;
        this.appointmentService.UpdateAppointment(appointment).subscribe({
          next: (res) => {
            this.successMessage = 'Rendez-vous modifié avec succès !✅';
            this.loadAppointments();
            this.isLoading=false;
            location.reload();
          },
    
          error: (err) => {
            console.error(err);
            this.isLoading=false;
            if (err.error) {
              this.errorMessage = err.error;
            } else {
              this.errorMessage = 'Une erreur est survenue';
            }
          }
        });


}
}
isInvalid(field: string): boolean {
      const control = this.form.get(field);
      return !!(control && control.invalid && control.touched);
    }

ChangeStatus(id:number,status:string) {
    this.isLoading = true;

    this.appointmentService.ChangeStatus(id,status).subscribe({
      next: () => {
        location.reload(); 
      },
      error: () => location.reload()
    });
  }

 pay(id: number) {
  this.isLoading = true;

  this.appointmentService.createStripeSession(id).subscribe({
    next: (url) => {
      window.location.href = url; 
    },
    error: () => {
      this.isLoading = false;
      alert("⚠️ Erreur paiement");
    }
  });
}
}
