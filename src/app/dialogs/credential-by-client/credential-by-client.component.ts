import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { Credential } from 'src/app/models/Credential.model';
import { UniversiteCredential } from 'src/app/models/UniversiteCredential.model';
import { RDV } from 'src/app/models/RDV.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { CredentialCommentsComponent } from '../credential-comments/credential-comments.component';

@Component({
  selector: 'app-credential-by-client',
  templateUrl: './credential-by-client.component.html',
  styleUrls: ['./credential-by-client.component.scss']
})
export class CredentialByClientComponent implements OnInit {
   user!: Utilisateur
  credential!: Credential;
  editMode = {
    emailOutlook: false,
    passwrodOutlook: false,
    emailGmail: false,
    passwrodGmail: false,
    prenotami: false,
    passwordPrenotami: false,
    universitaly: false,
    passwordUniversitaly: false
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
    communication: 'PAS_ENCORE',
    communicationDescripton: '',
    credential: {} as Credential  // temporary placeholder
  };
  
  RDVs: RDV[] = [];
  showAdRDVDialog = false;
  newRdv = {
    titreRDV: '',
    dateRendezVous: '',
    enumRendezVous: 'NON_VALIDER',
    credential: {} as Credential
  };

  showEditRDVDialog = false;
  selectedRdv: any = {};

  role!:string
  email!:string

 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
    private dialogRef: MatDialogRef<CredentialByClientComponent>, 
    private dialog: MatDialog,
    private credentialService: ClientsService,
    private authserv:AuthService
    
  ) {}
  ngOnInit(): void {
    this.email = sessionStorage.getItem("email")
    this.role = sessionStorage.getItem("role")
    if (this.email) {
      this.authserv.getUtilisateurByEmail(this.email).subscribe({
        next: (data) => {
          this.user = data
        },
        error: (error) => {
          console.error("Error fetching user:", error)
        },
      })
    }
    const clientId = this.data.clientID;
    this.credentialService.getCredentialByClientId(clientId).subscribe((data) => {
      this.credential = data;
  
      // Now fetch universities by credentialId
      this.loadUniversities(this.credential.idCredential);
      this.loadRDVs(this.credential.idCredential);

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

  loadRDVs(credentialId: number): void {
    this.credentialService.getRDVsByCredentialId(credentialId).subscribe({
      next: (data) => {
        this.RDVs = data;
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
  
    this.credentialService.updateCredential(this.credential.idCredential, this.credential,this.email).subscribe({
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

  saveFieldUpdate(): void {
    if (!this.credential) return;
  
    this.credentialService.updateCredential(this.credential.idCredential, this.credential,this.email).subscribe({
      next: (updatedCredential) => {
        this.credential = updatedCredential;
        console.log('Credential updated successfully.');
      },
      error: (err) => {
        console.error('Error updating credential:', err);
      }
    });
  }
  

  shouldDisableFields(): boolean {
  
    return this.role === 'ADMIN_TUNISIE' && ( this.credential.preInscrit === 'DONE' || this.credential.preInscrit === 'EN_COURS');
  }
  
  shouldDisablePresInscritFieldForAdminTunisie(): boolean {
  
    return this.role === 'ADMIN_TUNISIE' ;
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

  deleteUniversity(index: number): void{
    const updatedUni = this.universities[index];
    this.credentialService.deleteUniversiteCredential(updatedUni.idUniversite).subscribe({
      next: () => {
        this.loadUniversities(this.credential.idCredential);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l’université', err);
      }
    });
  }

  confirmDeleteUniversity(index: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this university?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteUniversity(index);
      }
    });
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
      communication: 'PAS_ENCORE',
      communicationDescripton: '',
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


  addRdv() {
    const credentialId = this.credential.idCredential;
  
    this.credentialService.addRDVToCredential(credentialId, this.newRdv).subscribe({
      next: (response) => {
        this.RDVs.push(response);
        this.showAdRDVDialog = false;
        this.resetNewRDV();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de RDV', err);
      }
    });
    
  }
  cancelAddRDV() {
    this.showAdRDVDialog = false;
    this.resetNewRDV();
  }
  
  resetNewRDV() {
    this.newRdv = {
      titreRDV: '',
      dateRendezVous: '',
      enumRendezVous: 'NON_VALIDER',
      credential: {} as Credential
    };
  }

  openRdvDialog() {
    this.showAdRDVDialog = true;
  }

  
  
  validateRendezVous(rdv :RDV): void {
    rdv.enumRendezVous='VALIDER'
    this.credentialService.updateRDV(rdv.idRDV, rdv).subscribe({
      next: (response) => {
        this.loadRDVs(this.credential.idCredential)  
      },
      error: (err) => {
        console.error('Erreur !!!', err);
      }
    });

  }

  openEditRDVDialog(rdv: any) {
    this.selectedRdv = { ...rdv }; // Clone to avoid live binding
    this.showEditRDVDialog = true;
  }
  
  cancelEditRDV() {
    this.showEditRDVDialog = false;
    this.selectedRdv = {};
  }
  
  updateRdv() {
    this.credentialService.updateRDV(this.selectedRdv.idRDV, this.selectedRdv).subscribe({
      next: (updatedRdv) => {
        const index = this.RDVs.findIndex(r => r.idRDV === updatedRdv.idRDV);
        if (index !== -1) {
          this.RDVs[index] = updatedRdv;
        }
        this.showEditRDVDialog = false;
      },
      error: (err) => {
        console.error('Error updating RDV:', err);
        // Optional: show error message to user
      }
    });
  }

  deleteRDV(rdv :RDV): void {
    this.credentialService.removeRDVFromCredential(rdv.idRDV).subscribe({
      next: (response) => {
        this.loadRDVs(this.credential.idCredential)  
      },
      error: (err) => {
        console.error('Erreur !!!', err);
      }
    });
  }

  confirmDeleteRDV(rdv :RDV) {
                  Swal.fire({
                    title: 'Are you sure you want to delete this RDV?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it',
                    cancelButtonText: 'No, keep it'
                  }).then((result) => {
                    if (result.value) {
                      this.deleteRDV(rdv);
                    }
                  });
                }
  openCommentDialog(credentialID: number) {
      const dialogRef = this.dialog.open(CredentialCommentsComponent, {
        data: { credentialID: credentialID },
        disableClose: true, // This ensures the dialog closes when clicking outside
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });
    }
}
