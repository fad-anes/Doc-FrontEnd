import {Doctor} from '../Model/Doctor';
import {Patient} from '../Model/Patient';
import {Message} from '../Model/Message';
export class Discussion{
    id!:number;
    createdAt!: string;
    doctor!: Doctor;
    patient!: Patient;
    messages: Message[];
}