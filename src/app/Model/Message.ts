import {Discussion} from '../Model/Discussion';
export class Message{
  id!: number;
  content: string;
  who: string; // "DOCTOR" | "PATIENT"
  createdAt!: Date;
  discussion!: Discussion;
}