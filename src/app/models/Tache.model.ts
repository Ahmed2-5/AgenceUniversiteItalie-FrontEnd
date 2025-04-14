<<<<<<< HEAD
import { Commentaire } from "./Commentaire.model";
=======
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
import { Utilisateur } from "./Utilisateur.model";

export class Tache {
    idTache!: number;
    titre!: string;
    description!: string;
<<<<<<< HEAD
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

=======
    status!: string;
    dateCreation!: Date;
    createdBy!: Utilisateur;
    assignedAdmins!: Utilisateur[];
}
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
