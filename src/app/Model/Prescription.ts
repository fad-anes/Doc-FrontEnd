import {Doctor} from '../Model/Doctor';
import {Patient} from '../Model/Patient';
import {Pharmacy} from '../Model/Pharmacy';

export class Prescription{
    id!:number;
    description!: string;
    date!: string;
    prescriptionStatus!: string;
    doctor!: Doctor;
    patient!: Patient;
    pharmacy!: Pharmacy;
}