import { UniversiteCredential } from "./UniversiteCredential.model";

  export class Credential {
    idCredential?: number;
    emailOutlook!: string;
    passwrodOutlook!: string;
    emailGmail!: string;
    passwrodGmail!: string;
    prenotami!: string;
    passwordPrenotami!: string;
    dateRendezVous!: string;
    enumRendezVous!: string;
    programmeEtude!: string;
    preInscrit!: string;
    dateTestItalien!: string;
    montantPayerItalie!: number;
    universiteCredentials!: UniversiteCredential[];
  }