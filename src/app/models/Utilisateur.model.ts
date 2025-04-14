<<<<<<< HEAD
import { Clients } from "./Clients.model";
import { Commentaire } from "./Commentaire.model";
import { Document } from "./Document.model";
=======
import { Commentaire } from "./Commentaire.model";
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
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
<<<<<<< HEAD
    profileImageUrl!:string;
=======
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
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
<<<<<<< HEAD
    documentAdded!: Document[];
    clientsCreated!: Clients[];
    clientsAssigned!: Clients[];
}
=======
  
}
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
