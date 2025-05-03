import { Clients } from "./Clients.model";
import { CommentaireCredential } from "./CommentaireCredential.model";
import { RDV } from "./RDV.model";
import { UniversiteCredential } from "./UniversiteCredential.model";

  export class Credential {
    idCredential?: number;
    emailOutlook!: string;
    passwrodOutlook!: string;
    emailGmail!: string;
    passwrodGmail!: string;
    prenotami!: string;
    passwordPrenotami!: string;
    universitaly!: string;
    passwordUniversitaly!: string;
    programmeEtude!: string;
    preInscrit!: string;
   // montantPayerItalie!: number;
    clients!:Clients
    RDVs!:RDV[]
    universiteCredentials!: UniversiteCredential[];
    commentaires!:CommentaireCredential[]
  }