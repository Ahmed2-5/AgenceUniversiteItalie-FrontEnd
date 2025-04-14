import { Document } from "./Document.model";
import { Utilisateur } from "./Utilisateur.model";

export class Clients {
    idClients?: number;
    nomClient!: string;
    prenomClient!: string;
    telephoneClient!: string;
    emailClient!: string;
    adresseClient!: string;
    villeClient!: string;
    codePostale!: number;
    dateNaissanceClient!: Date;
    langue!: string;
    service!: string;
    reference!: string;
    archive!: string; 
    clientCreatedby!: Utilisateur;
    assignedTo!: Utilisateur;
   // payementClient!: Payement[];
    documents!: Document[];
  }