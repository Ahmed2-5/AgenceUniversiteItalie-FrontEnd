import { ClientDocument } from "./ClientDocument.model";
import { Credential } from "./Credential.model";
import { Payement } from "./Payement.model";
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
    clientImageUrl!: string;
    clientCreatedby!: Utilisateur;
    assignedToTunisie!: Utilisateur;
    payementClient!: Payement[];
    documents!: ClientDocument[];
    credential!:Credential
    assignedToItalie!: Utilisateur;
  }



