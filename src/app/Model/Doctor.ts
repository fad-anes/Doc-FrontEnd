import {DayOff} from '../Model/DayOff';
import {Appointment} from '../Model/Appointment';
export class Doctor{
    id!:number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    phone!: string;
    address!: string;
    img!: string;
    speciality!: string;
    active!: boolean;
    daysOffs!: DayOff[];
    appointments!: Appointment[];
}