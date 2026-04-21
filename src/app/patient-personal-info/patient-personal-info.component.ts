import { Component,Input  } from '@angular/core';
import { DtoPatient } from '../Model/DtoPatient';

@Component({
  selector: 'app-patient-personal-info',
  templateUrl: './patient-personal-info.component.html',
  styleUrls: ['./patient-personal-info.component.css']
})
export class PatientPersonalInfoComponent {
@Input() patient: DtoPatient;
}
