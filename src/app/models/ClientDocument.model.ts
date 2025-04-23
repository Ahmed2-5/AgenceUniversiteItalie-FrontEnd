import { Clients } from "./Clients.model";
import { Utilisateur } from "./Utilisateur.model";

export class ClientDocument {

  idDocument!: number;
  nom!: string;
  cheminFichier!: string;
  dateAjout!: Date; 
  archiveDoc!: string;
  clientDocument!: Clients;
  ajouterPar!: Utilisateur;
  
}