import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { UserslistforaddtaskComponent } from '../userslistforaddtask/userslistforaddtask.component';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { Credential } from 'src/app/models/Credential.model';
import { UserslistforaddcondidatComponent } from '../userslistforaddcondidat/userslistforaddcondidat.component';

@Component({
  selector: 'app-add-condidat',
  templateUrl: './add-condidat.component.html',
  styleUrls: ['./add-condidat.component.scss']
})
export class AddCondidatComponent implements OnInit {
  villes: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Ariana', 'Gafsa', 'Kairouan',
    'Kasserine', 'Ben Arous', 'Nabeul', 'Monastir', 'Mahdia', 'Zaghouan'
  ];

  langues: string[] = ['ITALIEN', 'FRANCAIS', 'ANGLAIS', 'ALLEMAND', 'AUTRE'];
  services: string[] = ['GOLD', 'SILVER', 'BRONZE'];

  newClient!: Clients;
  email: string = '';
  selectedTunisieAdmin: Utilisateur | null = null;
  selectedItalieAdmin: Utilisateur | null = null;
  
  
  constructor(
    private clientsService: ClientsService,
    private dialogRef: MatDialogRef<AddCondidatComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');


    this.newClient = {
      nomClient: '',
      prenomClient: '',
      telephoneClient: '',
      emailClient: '',
      adresseClient: '',
      villeClient: '',
      codePostale: 0,
      dateNaissanceClient: new Date(),
      langue: '',
      service: '',
      reference: '',
      archive: 'NON_ARCHIVER',
      clientImageUrl: '',
      clientCreatedby: {} as Utilisateur,
      assignedToTunisie: {} as Utilisateur,
      payementClient: [],
      documents: [],
      credential:{} as Credential,
      assignedToItalie: {} as Utilisateur
    };
  }
  
  submitForm(): void {
    this.clientsService.createClient(
      this.newClient,
      this.email,
      this.selectedTunisieAdmin?.adresseMail || '',
      this.selectedItalieAdmin?.adresseMail || '',
    ).subscribe({
      next: (created) => {
        console.log('Client created:', created);
        this.dialogRef.close(created);
      },
      error: (err) => {
        console.error('Error creating client:', err);
      }
    });
  }
  

  openUsersDialog(): void {
    const dialogRef = this.dialog.open(UserslistforaddcondidatComponent, {
      width: '800px',
      data: {
        selectedADMINTUNISIE: this.selectedTunisieAdmin,
        selectedADMINITALIE: this.selectedItalieAdmin
      }
    });

    dialogRef.afterClosed().subscribe((result: {
      selectedADMINTUNISIE: Utilisateur,
      selectedADMINITALIE: Utilisateur
    }) => {
      if (result) {
        this.selectedTunisieAdmin = result.selectedADMINTUNISIE;
        this.selectedItalieAdmin = result.selectedADMINITALIE;
        this.newClient.assignedToTunisie = this.selectedTunisieAdmin;
        this.newClient.assignedToItalie = this.selectedItalieAdmin;
      }
    });
  }

  resetAssignedItalieAdmins(): void {
    this.selectedItalieAdmin = null;
    this.newClient.assignedToItalie = {} as Utilisateur;
  }

  resetAssignedTunisieAdmins(): void {
    this.selectedTunisieAdmin = null;
    this.newClient.assignedToTunisie = {} as Utilisateur;
  }
 

  closeDialog(): void {
    this.dialogRef.close();
  }
}
  

