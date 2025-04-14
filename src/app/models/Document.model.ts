import { Clients } from "./Clients.model";
import { Utilisateur } from "./Utilisateur.model";

export class Document {

  idDocument!: number;
  nom!: string;
  cheminFichier!: string;
  dateAjout!: Date; 
  clientDocument!: Clients;
  ajouterPar!: Utilisateur;
  
}