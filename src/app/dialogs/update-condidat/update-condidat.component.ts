import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-update-condidat',
  templateUrl: './update-condidat.component.html',
  styleUrls: ['./update-condidat.component.scss']
})
export class UpdateCondidatComponent implements OnInit {

  villes: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Ariana', 'Gafsa', 'Kairouan',
    'Kasserine', 'Ben Arous', 'Nabeul', 'Monastir', 'Mahdia', 'Zaghouan'
  ];
  langues: string[] = ['ITALIEN', 'FRANCAIS', 'ANGLAIS', 'ALLEMAND', 'AUTRE'];
  services: string[] = ['GOLD', 'SILVER', 'BRONZE'];

  updatedClient!: Clients;
  email: string = '';

  constructor(
    private clientsService: ClientsService,
    private dialogRef: MatDialogRef<UpdateCondidatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientID: number },
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');

    this.clientsService.getClientById(this.data.clientID).subscribe({
      next: (clientData) => {
        this.updatedClient = clientData;
      },
      error: (err) => console.error('Failed to load client:', err)
    });
  }

  submitForm(): void {
    this.clientsService.updateClient(this.updatedClient,this.data.clientID)
      .subscribe({
        next: (updated) => {
          console.log('Client updated:', updated);
          this.dialogRef.close(updated); // return to parent
        },
        error: (err) => {
          console.error('Error updating client:', err);
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
