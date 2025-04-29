import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from './../../models/Clients.model';

@Component({
  selector: 'app-list-clients-adminitalie',
  templateUrl: './list-clients-adminitalie.component.html',
  styleUrls: ['./list-clients-adminitalie.component.scss']
})
export class ListClientsAdminitalieComponent implements OnInit {

  clients: Clients[] = []
  loading = true
  error: string | null = null
  email!:string
  role!:string
  searchTerm: string = '';

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem("email")
    this.role = sessionStorage.getItem("role")

    this.loadClients()
  }

  loadClients(): void {
    this.loading = true
    this.clientsService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data.filter(client => 
          client.archive === 'NON_ARCHIVER' && client.communication === 'OUI')
        this.loading = false
      },
      error: (err) => {
        this.error = "Failed to load clients. Please try again."
        this.loading = false
        console.error("Error loading clients:", err)
      },
    })
  }

  takeClient(client: Clients) {
    this.clientsService.assignClientToAdminItalie(client.idClients, this.email)
      .subscribe({
        next: (response) => {console.log('Client assigned:', response)
          this.loadClients()
        },
        error: (err) => console.error('Assignment error:', err)
      });
  }

  removeClient(client: Clients) {
    this.clientsService.removeClientFromAdminItalie(client.idClients, this.email)
      .subscribe({
        next: (response) =>{
          console.log('Client removed:', response)
          this.loadClients()

        } ,
        error: (err) => console.error('Removal error:', err)
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
