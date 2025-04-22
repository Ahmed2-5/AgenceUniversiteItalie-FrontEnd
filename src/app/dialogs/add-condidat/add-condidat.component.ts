import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { UserslistforaddtaskComponent } from '../userslistforaddtask/userslistforaddtask.component';
import { Utilisateur } from 'src/app/models/Utilisateur.model';

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
  selectedAdmin: Utilisateur | null = null;

  
  
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
      clientCreatedby: {} as Utilisateur,
      assignedTo: {} as Utilisateur,
      payementClient: [],
      documents: []
    };
  }
  
  submitForm() {
    this.newClient.assignedTo = this.selectedAdmin;
    const assignedAdminEmail = this.selectedAdmin?.adresseMail || '';
    
    console.log('Admin Email:', this.email);
    console.log('Assigned Admin Email:', assignedAdminEmail);
  
    this.clientsService.createClient(this.newClient, this.email, assignedAdminEmail)
      .subscribe({
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
    const dialogRef = this.dialog.open(UserslistforaddtaskComponent, {
      width: '800px',
      data: { selectedSetUsers: new Set<Utilisateur>(this.selectedAdmin ? [this.selectedAdmin] : []) }
    });
  
    dialogRef.afterClosed().subscribe((selectedAdmins: Set<Utilisateur>) => {
      const selectedArray = Array.from(selectedAdmins);
      if (selectedArray.length > 0) {
        this.selectedAdmin = selectedArray[0]; // only one allowed
        this.newClient.assignedTo = this.selectedAdmin;
      }
    });
  }
  
  
  resetAssignedAdmin() {
    this.selectedAdmin = null;
    this.newClient.assignedTo = {} as any; // or set to null if needed
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
  

