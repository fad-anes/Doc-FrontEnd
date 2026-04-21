
import {Doctor} from '../Model/Doctor';
import {Patient} from '../Model/Patient';
export class Appointment{
    id!:number;
    date!: string;
    consultationMode!: string;
    appointmentStatus!: string;
    paid!: boolean;
    idPatient!: number;
    idDoctor!: number;
    lienVisio!: string;
    doctor!: Doctor;
    patient!: Patient;
}