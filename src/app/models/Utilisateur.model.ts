import { Clients } from "./Clients.model";
import { Commentaire } from "./Commentaire.model";
import { ClientDocument } from "./ClientDocument.model";
import { Role } from "./Role.model";
import { StatusCompte } from "./StatusCompte.model";
import { Tache } from "./Tache.model";
import { LogAction } from "./LogAction.model";
import { CommentaireCredential } from "./CommentaireCredential.model";

export class Utilisateur {
    idUtilisateur?: number;
    nom!: string;
    prenom!: string;
    adresseMail!: string;
    motDePasse!: string;
    telephone!: string;
    dateDeNaissance!: Date;
    profileImageUrl!:string;
    idTypeAuthentification!: number;
    idFacebook!: string;
    idGoogle!: string;
    dateCreation!: Date;
    dateDerniereConnexion!: Date;
    role!: Role;
    statusCompte!: StatusCompte;
    createdTaches!: Tache[];
    assignedTaches!: Tache[];
    commentaires!: Commentaire[];
    documentAdded!: ClientDocument[];
    clientsCreated!: Clients[];
    clientsAssigned!: Clients[];
    logActions!:LogAction[]
    credentialCommentaires!:CommentaireCredential[]
}
