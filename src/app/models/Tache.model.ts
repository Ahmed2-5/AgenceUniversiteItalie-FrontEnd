import { Commentaire } from "./Commentaire.model";
import { Utilisateur } from "./Utilisateur.model";

export class Tache {
    idTache!: number;
    titre!: string;
    description!: string;
    dueDate!: Date;
    priority!: string;
    status!: string;
    dateCreation!: Date;
    dateModification!: Date;
    dateEcheance!: Date;
    createdBy!: Utilisateur;
    assignedAdmins!: Utilisateur[];
    commentaires!: Commentaire[]
}

