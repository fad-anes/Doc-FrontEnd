import { Component } from '@angular/core';
import { MedicalTest } from '../Model/MedicalTest';
import { MedicalTestService } from '../Service/MedicalTestService';
import { AuthService } from '../Service/AuthService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-medical-test',
  templateUrl: './medical-test.component.html',
  styleUrls: ['./medical-test.component.css']
})
export class MedicalTestComponent {
selectedFile!: File;
selectedId!: number;
medicalTests: MedicalTest[];
user!: any;
isLoading: boolean = false;
isLabd: boolean = false;
showPoup: boolean = false;
showPdf: boolean = false;
safePdfUrl!: SafeResourceUrl;

constructor(
  private medicalTestService: MedicalTestService,
  private authService: AuthService,
  private sanitizer: DomSanitizer
) {}

ngOnInit(): void {
  this.user = this.authService.getDetails();
  if(this.user.role==='LABORATORY'){
    this.isLabd=true;
  }
  this.medicalTestService.retrieveAllMedicalTest(this.user.id,this.user.role).subscribe(res => {
      this.medicalTests = res;
  });
}

onFileSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  // ✅ Vérifier si c'est un PDF
  if (file.type !== 'application/pdf') {
    alert('Seuls les fichiers PDF sont autorisés ❌');
    event.target.value = ''; // reset input
    this.selectedFile = null;
    return;
  }

  // ✅ OK
  this.selectedFile = file;
}
 changeStatus(){
  this.isLoading=true;
  if(!this.selectedFile){
    alert("⚠️ vous devez télécharger le fichier de résultat ");
    return;
  }
  this.medicalTestService.ChangeStatusMedicalTest(this.selectedId,this.selectedFile).subscribe({
    next: (res) => {
      location.reload();
    },
    error: (err) => {
      this.isLoading=false;
      if (err.error) {
        alert("⚠️"+err.error);
      } else {
        alert("⚠️ Une erreur est survenue");
      }
    }
  });
} 
openPopup(id:number){
  this.selectedId=id;
  this.showPoup=true;
}  
ClosePoup(){
  this.selectedId=null;
  this.showPoup=false;
} 
showp(url:string){
  this.showPdf=true;
  this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
} 
closesp(){
  this.showPdf=false;
  this.safePdfUrl=null;
}
}
