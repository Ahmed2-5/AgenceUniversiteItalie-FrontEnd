import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPayementToCLientComponent } from 'src/app/dialogs/add-payement-to-client/add-payement-to-client.component';
import { ClientByIdComponent } from 'src/app/dialogs/client-by-id/client-by-id.component';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { Utilisateur } from './../../models/Utilisateur.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-list-clients-advanced',
  templateUrl: './list-clients-advanced.component.html',
  styleUrls: ['./list-clients-advanced.component.scss']
})
export class ListClientsAdvancedComponent implements OnInit {

  packOptions = ['GOLD', 'SILVER', 'BRONZE'];
  clients: Clients[] = [];

  constructor(private clientsService:ClientsService,
              private dialog: MatDialog,
              private UserService :UserService
    
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data.filter(client => client.archive === 'NON_ARCHIVER');
      },
      error: (err) => console.error('Error loading clients', err)
    });
  }


  getTrancheMontant(client: Clients, index: number): string | number {
    const paiement = client.payementClient[0];
    if (paiement && paiement.tranches?.[index]) {
      return paiement.tranches?.[index]?.montant;
    }
    return '-';
  }

  getTrancheClass(client: Clients, index: number): string {
    const tranche = client.payementClient[0]?.tranches?.[index];
    if (!tranche) return '';
    switch (tranche.statusTranche) {
      case 'PAYEE': return 'status-paid';
      case 'EN_ATTENTE': return 'status-pending';
      case 'EN_RETARD': return 'status-unpaid';
      default: return '';
    }
  }
  
  changePack(client: Clients) {
    if (client.idClients) {
      this.clientsService.updateClient(client, client.idClients).subscribe({
        next: (updatedClient) => {
          console.log('Pack updated successfully:', updatedClient.service);
        },
        error: (err) => {
          console.error('Error updating pack', err);
        }
      });
    }
  }

  openClientDialog(clientId: number) {
    const dialogRef = this.dialog.open(ClientByIdComponent, {
      data: { clientID: clientId },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }

  openADDPaymenetDialog(clientID: number) {
        const dialogRef = this.dialog.open(AddPayementToCLientComponent, {
          data: { clientID: clientID },
          disableClose: true, // This ensures the dialog closes when clicking outside
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadClients()
            console.log('Dialog closed with result:', result);
          }
        });
   }

   Archiver(clientID: number) {
      this.clientsService.archiveClient(clientID).subscribe({
        next: (updatedClient) => {
          console.log('Client archived successfully:');
          this.loadClients()
        },
        error: (err) => {
          console.error('Error!!', err);
        }
      });
   }
}
