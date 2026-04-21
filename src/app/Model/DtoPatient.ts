import {Appointment} from '../Model/Appointment';
import {MedicalTest} from '../Model/MedicalTest';
import {Prescription} from '../Model/Prescription';
export class DtoPatient{
    id!:number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    phone!: string;
    appointments!: Appointment[];
    prescriptions!: Prescription[];
    medicalTests!: MedicalTest[];
}