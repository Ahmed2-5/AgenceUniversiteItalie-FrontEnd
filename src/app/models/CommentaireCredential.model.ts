import { Credential } from "./Credential.model";
import { Utilisateur } from "./Utilisateur.model";

export class CommentaireCredential {
    idCommentaireCredential!: number;
    contenuCommentaireCredential!: string;
    dateCreationCommentaireCredential!: Date;
    credential!: Credential;
    utilisateur!: Utilisateur;
}
