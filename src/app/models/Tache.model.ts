import { Utilisateur } from "./Utilisateur.model";

export class Tache {
    idTache!: number;
    titre!: string;
    description!: string;
    status!: string;
    dateCreation!: Date;
    createdBy!: Utilisateur;
    assignedAdmins!: Utilisateur[];
}