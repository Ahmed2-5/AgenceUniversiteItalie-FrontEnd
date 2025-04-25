import { Clients } from "./Clients.model";
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
    programmeEtude!: string;
    preInscrit!: string;
   // montantPayerItalie!: number;
    clients!:Clients
    RDVs!:RDV[]
    universiteCredentials!: UniversiteCredential[];
  }