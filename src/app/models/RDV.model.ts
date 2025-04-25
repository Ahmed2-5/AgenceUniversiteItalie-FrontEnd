import { Credential } from "./Credential.model";

export class RDV {
    idRDV?: number;
    titreRDV!: string;
    dateRendezVous!: string;
    enumRendezVous!: string;
    credential!:Credential;
}