import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { Credential } from 'src/app/models/Credential.model';
import { UniversiteCredential } from 'src/app/models/UniversiteCredential.model';

@Component({
  selector: 'app-credential-by-client',
  templateUrl: './credential-by-client.component.html',
  styleUrls: ['./credential-by-client.component.scss']
})
export class CredentialByClientComponent implements OnInit {

  credential!: Credential;
  editMode = {
    emailOutlook: false,
    passwrodOutlook: false,
    emailGmail: false,
    passwrodGmail: false,
    prenotami: false,
    passwordPrenotami: false
  };

  showUniversityList = false;
  universities: UniversiteCredential[] = [];
  editUniversityIndexMap: { [key: number]: { [field: string]: boolean } } = {};

  showAddUniversityForm = false;

  newUniversity: UniversiteCredential = {
    univeriste: '',
    nomUniversite: '',
    emailUniversite: '',
    passwordUniversite: '',
    credential: {} as Credential  // temporary placeholder
  };
  


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
    private dialogRef: MatDialogRef<CredentialByClientComponent>, 
    private dialog: MatDialog,
    private credentialService: ClientsService
  ) {}
  ngOnInit(): void {
    const clientId = this.data.clientID;
    this.credentialService.getCredentialByClientId(clientId).subscribe((data) => {
      this.credential = data;
  
      // Now fetch universities by credentialId
      this.loadUniversities(this.credential.idCredential);
    });
  }
  
  loadUniversities(credentialId: number): void {
    this.credentialService.getUniversiteCredentialsByCredentialId(credentialId).subscribe({
      next: (data) => {
        this.universities = data;
      },
      error: (err) => {
        console.error('Failed to load universities:', err);
      }
    });
  }

  toggleEdit(field: keyof typeof this.editMode) {
    this.editMode[field] = !this.editMode[field];
  }

  saveFieldAndExitEdit(field: keyof typeof this.editMode): void {
    if (!this.credential) return;
  
    this.credentialService.updateCredential(this.credential.idCredential, this.credential).subscribe({
      next: (updated) => {
        this.credential = updated;
        this.editMode[field] = false; // Exit edit mode
        console.log(`Field ${field} updated.`);
      },
      error: (err) => {
        console.error(`Failed to update ${field}:`, err);
      }
    });
  }
  

  validateRendezVous(): void {
    if (!this.credential) return;
  
    // Update the local state
    this.credential.enumRendezVous = 'VALIDER';
  
    // Send the updated credential to the backend
    this.credentialService.updateCredential(this.credential.idCredential, this.credential).subscribe({
      next: (updatedCredential) => {
        this.credential = updatedCredential;
        console.log('Rendez-vous validated and saved.');
      },
      error: (err) => {
        console.error('Error validating rendez-vous:', err);
        // Optional: show a toast/alert
      }
    });
  }
  
  saveFieldUpdate(): void {
    if (!this.credential) return;
  
    this.credentialService.updateCredential(this.credential.idCredential, this.credential).subscribe({
      next: (updated) => {
        this.credential = updated;
        console.log('Fields updated successfully.');
      },
      error: (err) => {
        console.error('Error updating fields:', err);
        // Optional: add user feedback
      }
    });
  }  

  toggleEditUniversityField(index: number, field: string): void {
    if (!this.editUniversityIndexMap[index]) {
      this.editUniversityIndexMap[index] = {};
    }
    this.editUniversityIndexMap[index][field] = true;
  }
  
  // Save and exit edit mode
  saveUniversityField(index: number): void {
    const updatedUni = this.universities[index];
  
    this.credentialService.updateUniversiteCredential(updatedUni.idUniversite, updatedUni).subscribe({
      next: () => {
        this.editUniversityIndexMap[index] = {};
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l’université', err);
      }
    });
  }

  openUniversityDialog() {
    this.showUniversityList = true;
  }
  
  closeUniversityDialog() {
    this.showUniversityList = false;
  }
  


  openAddUniversityForm() {
    this.showAddUniversityForm = true;
  }
  
  cancelAddUniversity() {
    this.showAddUniversityForm = false;
    this.resetNewUniversity();
  }
  
  resetNewUniversity() {
    this.newUniversity = {
      univeriste: '',
      nomUniversite: '',
      emailUniversite: '',
      passwordUniversite: '',
      credential: {} as Credential
    };
  }
  
  
  submitNewUniversity() {
    const credentialId = this.credential.idCredential; // assuming `credential` is already loaded
  
    this.credentialService.addUniversiteCredentialToCredential(credentialId, this.newUniversity).subscribe({
      next: (response) => {
        this.universities.push(response);
        this.showAddUniversityForm = false;
        this.resetNewUniversity();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de l’université', err);
      }
    });
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
