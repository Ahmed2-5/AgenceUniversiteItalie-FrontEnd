import { Clients } from "./Clients.model";
import { Tranche } from "./Tranche.model";


export class Payement {
    idPayement?:number;
    montantaTotal!:number;
    dateCreation!:Date;
    leReste!:string;
    statusPaiment!:string;
    tranches!:Tranche[];
    client!:Clients;
}