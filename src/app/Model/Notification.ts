export class Notification{
    id!:number;
    message!: string;
    type!: string;
    createdAt!: Date;
    idRecever!: number;
    seen!: boolean;
}