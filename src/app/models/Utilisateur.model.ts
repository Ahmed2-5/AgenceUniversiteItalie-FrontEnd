import { Commentaire } from "./Commentaire.model";
import { Role } from "./Role.model";
import { StatusCompte } from "./StatusCompte.model";
import { Tache } from "./Tache.model";

export class Utilisateur {
    idUtilisateur!: number;
    nom!: string;
    prenom!: string;
    adresseMail!: string;
    motDePasse!: string;
    telephone!: string;
    dateDeNaissance!: Date;
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
    profileImageUrl!:string;
}
