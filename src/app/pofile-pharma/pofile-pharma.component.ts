import { Component } from '@angular/core';
import { PharmacyService } from '../Service/PharmacyService';
import { Pharmacy } from '../Model/Pharmacy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pofile-pharma',
  templateUrl: './pofile-pharma.component.html',
  styleUrls: ['./pofile-pharma.component.css']
})
export class PofilePharmaComponent {

  form!: FormGroup;
    pha!: Pharmacy;
    errorMessage: string = '';
    successMessage: string = '';
    selectedFile!: File;
    isLoading: boolean = false;
    previewUrl: string | ArrayBuffer | null = null;

    constructor(
        private fb: FormBuilder,
        private pharmacyService: PharmacyService
      ) {}
    
       ngOnInit(): void {
          this.form = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', [Validators.required]]
          });
    
          this.pharmacyService.retrievepharmacy(sessionStorage.getItem('email')!)
        .subscribe((pharmacy) => {
          this.pha = pharmacy;
          this.form.patchValue({
            name: pharmacy.name,
            address: pharmacy.address,
            email: pharmacy.email,
            phone: pharmacy.phone
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

  if (this.pha?.img) return this.pha.img;

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
      const pharmacy: Pharmacy = this.form.value;
      pharmacy.id = this.pha.id;

      if(this.selectedFile){
        this.pharmacyService.UpdatePharmacyWithimage(pharmacy, this.selectedFile).subscribe({
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
        this.pharmacyService.UpdatePharmacy(pharmacy).subscribe({
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
