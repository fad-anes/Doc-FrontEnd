import {Doctor} from '../Model/Doctor';
import {Patient} from '../Model/Patient';
import {Laboratory} from '../Model/Laboratory';

export class MedicalTest{
    id!:number;
    description!: string;
    date!: string;
    testStatus!: string;
    result!: string;
    doctor!: Doctor;
    patient!: Patient;
    laboratory!: Laboratory;
}