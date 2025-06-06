import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPayementToCLientComponent } from 'src/app/dialogs/add-payement-to-client/add-payement-to-client.component';
import { ClientByIdComponent } from 'src/app/dialogs/client-by-id/client-by-id.component';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';
import { Utilisateur } from 'src/app/models/Utilisateur.model';

@Component({
  selector: 'app-list-clients-advanced',
  templateUrl: './list-clients-advanced.component.html',
  styleUrls: ['./list-clients-advanced.component.scss']
})
export class ListClientsAdvancedComponent implements OnInit {

  packOptions = ['GOLD', 'SILVER', 'BRONZE'];
  clients: Clients[] = [];
  listAdminTunisie: Utilisateur[] = [];
  email: string = '';
  role: string = '';
  searchTerm: string = '';
  selectedStatus: string = 'ALL';
  agentOptions: string[] = [];
  constructor(private clientsService:ClientsService,
              private dialog: MatDialog,
              private UserService :UserService
    
  ) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

    if (this.role !== "ADMIN_ITALIE") {
      this.loadClients();
      this.loadListAdminTunisie();
    } else if (this.role === "ADMIN_ITALIE") {
      this.loadClientsToAdminITALIE();
    }
  }

  loadClients() {
    this.clientsService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data
          .filter(client => client.archive === 'NON_ARCHIVER')
          .map(client => {
            // Safely compute full name for dropdown display
            const assigned = client.assignedToTunisie;
            return {
              ...client,
              adminFullName: assigned ? `${assigned.nom} ${assigned.prenom}` : ''
            };
          });
      },
      error: (err) => console.error('Error loading clients', err)
    });
  }
  


  loadClientsToAdminITALIE() {
    this.clientsService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data.filter(client => 
          client.archive === 'NON_ARCHIVER' && client.communication === 'OUI'
        );
      },
      error: (err) => console.error('Error loading clients', err)
    });
  }
  
  loadListAdminTunisie() {
    this.UserService.getUtilisateurByRole_LibelleRole("ADMIN_TUNISIE").subscribe({
      next: (data) => {
        this.listAdminTunisie = data;
        this.agentOptions = data.map(admin => `${admin.nom} ${admin.prenom}`);
      },
      error: (err) => console.error('Error loading admins', err)
    });
  }

  assignClientToAdminTunisie(client: Clients, selectedAdminFullName: string) {
  
    const selectedAdmin = this.listAdminTunisie.find(admin => `${admin.nom} ${admin.prenom}` === selectedAdminFullName);
    const superadminEmail = this.email;
    console.log(selectedAdmin)
    console.log(superadminEmail)

    if (!selectedAdmin || !client.idClients) return;
  
    this.clientsService.UpdateAssignClientToAdminTunisie(client.idClients, selectedAdmin.adresseMail, superadminEmail)
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Admin assigned successfully', 'success');
        },
        error: (err) => {
          console.error('Error assigning admin:', err);
          Swal.fire('Error', 'Failed to assign admin', 'error');
        }
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
  
  changePack(client: Clients) {
    if (client.idClients) {
      this.clientsService.updateClient(client, client.idClients,this.email).subscribe({
        next: (updatedClient) => {
          console.log('Pack updated successfully:', updatedClient.service);
          this.openADDPaymenetDialog(client.idClients);

        },
        error: (err) => {
          console.error('Error updating pack', err);
        }
      });
    }
  }

  getAvailablePackOptions(currentPack: string): string[] {
    if (currentPack === 'GOLD') {
      return ['GOLD']; // Only GOLD
    } else if (currentPack === 'SILVER') {
      return ['GOLD', 'SILVER']; // GOLD and SILVER
    } else {
      return this.packOptions; // All (GOLD, SILVER, BRONZE)
    }
  }
  

  openClientDialog(clientId: number) {
    const dialogRef = this.dialog.open(ClientByIdComponent, {
      data: { clientID: clientId },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadClients()

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
      this.clientsService.archiveClient(clientID,this.email).subscribe({
        next: (updatedClient) => {
          console.log('Client archived successfully:');
        },
        error: (err) => {
          console.error('Error!!', err);
        }
      });
   }

   confirmArchiveBox(clientID: number) {
       Swal.fire({
         title: 'Are you sure you want to archive this client?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, archive it',
         cancelButtonText: 'No, keep it'
       }).then((result) => {
         if (result.value) {
           this.Archiver(clientID); // Activate user
           Swal.fire("client archived", "This client has been archived", "success").then(() => {
            this.loadClients()
            // Reload the page after activation
           });
         }
       });
     }
     
     filterClients() {
      const search = this.searchTerm.trim().toLowerCase();
    
      return this.clients.filter(client => {
        const matchesSearch = !search || 
          (client.prenomClient?.toLowerCase().startsWith(search) || 
           client.nomClient?.toLowerCase().startsWith(search));
        
        const paiement0Status = client.payementClient && client.payementClient.length > 0 ? client.payementClient[0]?.statusPaiment : 'COMPLETE';
        const paiement1Status = client.payementClient && client.payementClient.length > 1 ? client.payementClient[1]?.statusPaiment : 'COMPLETE';
    
        let globalStatus: string = 'UNKNOWN';
        
        if (paiement0Status === 'EN_COURS' || paiement1Status === 'EN_COURS') {
          globalStatus = 'EN_COURS';
        } else if (paiement0Status === 'COMPLETE' && paiement1Status === 'COMPLETE') {
          globalStatus = 'COMPLETE';
        }
    
        const matchesStatus = this.selectedStatus === 'ALL' || globalStatus === this.selectedStatus;
    
        return matchesSearch && matchesStatus;
      });
    }
    
    
    
  
    setStatusFilter(status: string) {
      this.selectedStatus = status;
    }
}
