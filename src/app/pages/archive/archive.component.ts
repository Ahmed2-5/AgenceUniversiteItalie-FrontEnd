import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPayementToCLientComponent } from 'src/app/dialogs/add-payement-to-client/add-payement-to-client.component';
import { ClientByIdComponent } from 'src/app/dialogs/client-by-id/client-by-id.component';
import { Clients } from 'src/app/models/Clients.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

    packOptions = ['GOLD', 'SILVER', 'BRONZE'];
    clients: Clients[] = [];
    email: string = '';
    isSuperAdmin: boolean = false; 
    searchTerm: string = '';

    constructor(private clientsService:ClientsService,
                private dialog: MatDialog,
                private UserService :UserService,
                private authserv : AuthService
      
    ) { }
  
    ngOnInit(): void {
      this.email = sessionStorage.getItem('email');
      const role = sessionStorage.getItem('role') || '{}';
      if (role === "SUPER_ADMIN") {
        this.isSuperAdmin = true;
        this.loadClients();
      } else if(role === "ADMIN_TUNISIE") {
        this.loadClientsByAssignedToTUNISIE(this.email);
      }
    }
  
    loadClients() {
      this.clientsService.getAllClients().subscribe({
        next: (data) => {
          this.clients = data.filter(client => client.archive === 'ARCHIVER');
        },
        error: (err) => console.error('Error loading clients', err)
      });
    }

    loadClientsByAssignedToTUNISIE(email : string) {
      this.clientsService.getClientsByAssignedToTunisie(email).subscribe({
        next: (data) => {
          this.clients = data.filter(client => client.archive === 'ARCHIVER');
        },
        error: (err) => console.error('Error loading clients', err)
      });
    }
  
  
    getTrancheMontant(client: Clients, index: number,i: number): string | number {
      const paiement = client.payementClient[i];
      if (paiement && paiement.tranches?.[index]) {
        return paiement.tranches?.[index]?.montant;
      }
      return '-';
    }
  
    getTrancheClass(client: Clients, index: number,i: number): string {
      const tranche = client.payementClient[i]?.tranches?.[index];
      if (!tranche) return '';
      switch (tranche.statusTranche) {
        case 'PAYEE': return 'status-paid';
        case 'EN_ATTENTE': return 'status-pending';
        case 'EN_RETARD': return 'status-unpaid';
        default: return '';
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

     Unarchiver(clientID: number) {
        this.clientsService.unarchiveClient(clientID).subscribe({
          next: (updatedClient) => {
            console.log('Client archived successfully:');
            this.loadClients()
          },
          error: (err) => {
            console.error('Error!!', err);
          }
        });
     }

     confirmUnarchiveBox(clientID: number) {
            Swal.fire({
              title: 'Are you sure you want to unarchive this client?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, unarchive it',
              cancelButtonText: 'No, keep it'
            }).then((result) => {
              if (result.value) {
                this.Unarchiver(clientID); // Activate user
                Swal.fire("client unarchived", "This client has been unarchived", "success").then(() => {
                 this.loadClients()
                 // Reload the page after activation
                });
              }
            });
          }

          delete(clientID: number) {
            this.clientsService.deleteClient(clientID,this.email).subscribe({
              next: (d) => {
                console.log('Client deleted successfully:');
                this.loadClients()
              },
              error: (err) => {
                console.error('Error!!', err);
              }
            });
         }
    
         confirmDeleteBox(clientID: number) {
                Swal.fire({
                  title: 'Are you sure you want to delete this client?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it',
                  cancelButtonText: 'No, keep it'
                }).then((result) => {
                  if (result.value) {
                    this.delete(clientID); // Activate user
                    Swal.fire("client deleted", "This client has been deleted", "success").then(() => {
                     this.loadClients()
                    });
                  }
                });
              }
     
              filterClients() {
                const search = this.searchTerm.trim().toLowerCase();
              
                return this.clients.filter(client => {
                  const matchesSearch = !search || 
                    (client.prenomClient.toLowerCase().startsWith(search) || 
                     client.nomClient.toLowerCase().startsWith(search));
              
              
                  return matchesSearch;
                });
              }
  }
  