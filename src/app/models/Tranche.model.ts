import { Payement } from "./Payement.model";

export class Tranche {

    idTranche?: number;
    montant!: number;
    dateLimite!:Date;
    dateResglement!:Date;
    numero!: number;
    statusTranche!:string;
    notificationEnvoyee!:boolean;
    notificationRetardEnvoyee!:boolean;
    payement!:Payement;
    

}