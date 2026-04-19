import { Component } from '@angular/core';
import { DoctorService } from '../Service/DoctorService';
import { Doctor } from '../Model/Doctor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pofile-doctor',
  templateUrl: './pofile-doctor.component.html',
  styleUrls: ['./pofile-doctor.component.css']
})
export class PofileDoctorComponent {

  form!: FormGroup;
  doc!: Doctor;
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile!: File;
  isLoading: boolean = false;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {}

   ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]],
        speciality: ['', [Validators.required]]
      });

      this.doctorService.retrieveDoctor(sessionStorage.getItem('email')!)
    .subscribe((doctor) => {
      this.doc = doctor;
      this.form.patchValue({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        address: doctor.address,
        email: doctor.email,
        phone: doctor.phone,
        speciality: doctor.speciality
      });

    });
    }

onFileSelected(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        if (!file.type.startsWith('image/')) {
          this.errorMessage = 'Le fichier doit être une image';
          return;
        }
  
        if (file.size > 2 * 1024 * 1024) {
          this.errorMessage = 'Image trop volumineuse (max 2MB)';
          return;
        }
  const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  
        this.selectedFile = file;
        this.errorMessage = '';
      }
    }
    DeleteFile(){
      this.selectedFile = undefined!;
      this.previewUrl = null;
    }

    getImageSrc(): string {
  if (this.previewUrl) return this.previewUrl as string;

  if (this.doc?.img) return this.doc.img;

  return 'assets/front/images/why-choose/why-choose-1-1.jpg';
}

onSubmit() {
  
      this.errorMessage = '';
      this.successMessage = '';
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading=true;
      const doctor: Doctor = this.form.value;
      doctor.id = this.doc.id;

      if(this.selectedFile){
        this.doctorService.UpdateDoctorWithimage(doctor, this.selectedFile).subscribe({
          next: (res) => {
            this.successMessage = 'Profil mis à jour avec succès !✅';
            sessionStorage.setItem('email', this.form.get('email')?.value);
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
      }else{
        this.doctorService.UpdateDoctor(doctor).subscribe({
          next: (res) => {
            this.successMessage = 'Profil mis à jour avec succès !✅';
            sessionStorage.setItem('email', this.form.get('email')?.value);
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
}
