import { Tache } from "./Tache.model";
import { Utilisateur } from "./Utilisateur.model";

export class Commentaire {
    idCommentaire!: number;
    contenu!: string;
    dateCreationCommentaire!: Date;
    tache!: Tache;
    utilisateur!: Utilisateur;
}