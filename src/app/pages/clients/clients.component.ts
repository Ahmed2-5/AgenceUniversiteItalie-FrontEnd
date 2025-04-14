import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCondidatComponent } from 'src/app/dialogs/add-condidat/add-condidat.component';
import { UpdateCondidatComponent } from 'src/app/dialogs/update-condidat/update-condidat.component';
import { Clients } from 'src/app/models/Clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Clients[] = [];
  Math = Math;

  currentPage = 0;
  pageSize = 5;
  email: string = '';

  constructor(private dialog: MatDialog, private clientsService: ClientsService) {}  

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error loading clients', err)
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCondidatComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clients.push(result);
      }
    });
  }

  get pagedClients() {
    const start = this.currentPage * this.pageSize;
    return this.clients.slice(start, start + this.pageSize);
  }


  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.clients.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  openUpdateDialog(clientID: number): void {
  
      const dialogRef = this.dialog.open(UpdateCondidatComponent, {
        data: { clientID } 
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loadClients()
        console.log('Dialog closed with result:', result);
      });
    }
  
    deleteClient(client: Clients) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: `Voulez-vous vraiment supprimer ${client.nomClient} ${client.prenomClient} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientsService.deleteClient(client.idClients, this.email).subscribe({
            next: () => {
              this.loadClients();
            },
            error: err => {
              this.loadClients();
              console.error('Erreur lors de la suppression du client :', err);
            }
          });
        }
      });
    }
    
  

}
