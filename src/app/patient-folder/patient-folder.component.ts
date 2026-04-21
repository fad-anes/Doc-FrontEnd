import { Component, Input  } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PatientService } from '../Service/PatientService';
import { DtoPatient } from '../Model/DtoPatient';
import { Prescription } from '../Model/Prescription';
import { MedicalTest } from '../Model/MedicalTest';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-folder',
  templateUrl: './patient-folder.component.html',
  styleUrls: ['./patient-folder.component.css'],
  animations: [
    trigger('tabAnimation', [

      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])

    ])
  ]
})
export class PatientFolderComponent {
  @Input() patient: DtoPatient;
  @Input() prescriptions: Prescription[] = [];
  @Input() medicalTests: MedicalTest[] = [];
  activeTab: string = 'info';
constructor(private route: ActivatedRoute,private patientService: PatientService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.PatientFolder(id).subscribe((p: DtoPatient) => {
      this.patient = p;
      this.prescriptions = p.prescriptions;
      this.medicalTests = p.medicalTests;
    });
  }
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
