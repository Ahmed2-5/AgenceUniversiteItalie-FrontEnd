import { Component, OnInit } from '@angular/core';
import { LogAction } from 'src/app/models/LogAction.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: LogAction[] = [];
  filteredLogs: LogAction[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  searchTerm: string = '';

  selectedLog: LogAction | null = null;
  showDetails: boolean = false;

  user:Utilisateur=new Utilisateur()


  constructor(private logService: AuthService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.getAllLogs().subscribe({
      next: (data) => {
        // Sort logs from newest to oldest
        this.logs = data.sort((a, b) => new Date(b.dateAction).getTime() - new Date(a.dateAction).getTime());
        this.applySearchFilter(); // Apply search filter after loading the logs
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
      }
    });
  }
  
  applySearchFilter(): void {
    if (this.searchTerm) {
      // Convert the search term to lowercase for case-insensitive matching
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
      // Filter logs where the title contains a word starting with the search term
      this.filteredLogs = this.logs.filter(log => 
        log.titre.toLowerCase()
          .split(' ')  // Split the title into words
          .some(word => word.startsWith(lowerCaseSearchTerm))  // Check if any word starts with the search term
      );
    } else {
      // If no search term, reset the filtered logs and apply pagination
      this.applyPagination();
    }
  }
  
  
  
  applyPagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredLogs = this.logs.slice(start, end);
    this.totalPages = Math.ceil(this.logs.length / this.pageSize);
  }
  

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }
  
  loadAdmin(){
    const email = sessionStorage.getItem("email")

    if (email) {
      this.logService.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data
          if (this.user.profileImageUrl) {
            this.user.profileImageUrl = `http://localhost:8082/api/utilisateurs/uploads/${data.profileImageUrl}`
          }
         
        },
        error: (error) => {
          console.error("Error fetching user:", error)
        },
      })
    }
  }

  viewDetails(log: LogAction): void {
  this.selectedLog = log;
  this.showDetails = true;
  this.loadAdmin()
  }
  
  closeDetails(): void {
  this.selectedLog = null;
  this.showDetails = false;
  this.user = null
  }

}
