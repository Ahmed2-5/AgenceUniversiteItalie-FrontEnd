import { Clients } from "./Clients.model";
import { Utilisateur } from "./Utilisateur.model";

export class ClientDocument {

  idDocument!: number;
  nom!: string;
  cheminFichier!: string;
  dateAjout!: Date; 
  clientDocument!: Clients;
  ajouterPar!: Utilisateur;
  
}