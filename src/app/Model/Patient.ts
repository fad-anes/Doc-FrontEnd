import {Appointment} from '../Model/Appointment';
export class Patient{
    id!:number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    phone!: string;
    active!: boolean;
    appointments!: Appointment[];
}