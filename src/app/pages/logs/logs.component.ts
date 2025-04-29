import { Component, OnInit } from '@angular/core';

interface Log {
  idlog: number;
  message: string;
  date: Date;
}
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: Log[] = [
    { idlog: 1001, message: 'System startup completed', date: new Date('2023-04-15T08:30:00') },
    { idlog: 1002, message: 'User authentication failed', date: new Date('2023-04-15T09:45:23') },
    { idlog: 1003, message: 'Database backup completed', date: new Date('2023-04-15T12:00:00') },
    { idlog: 1004, message: 'API rate limit exceeded', date: new Date('2023-04-15T14:22:10') },
    { idlog: 1005, message: 'New user registered', date: new Date('2023-04-15T16:05:45') },
    { idlog: 1006, message: 'Configuration updated', date: new Date('2023-04-16T10:15:30') },
    { idlog: 1007, message: 'Scheduled maintenance started', date: new Date('2023-04-16T22:00:00') },
    { idlog: 1008, message: 'Security alert: unauthorized access attempt', date: new Date('2023-04-17T03:12:54') },
    { idlog: 1009, message: 'Memory usage warning', date: new Date('2023-04-17T11:30:22') },
    { idlog: 1010, message: 'System shutdown initiated', date: new Date('2023-04-17T18:45:00') }
  ];

  filteredLogs: Log[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.logs;
    
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(log => 
        log.idlog.toString().includes(search) || 
        log.message.toLowerCase().includes(search) || 
        log.date.toISOString().includes(search)
      );
    }
    
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredLogs = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  clearSearch(): void {
    this.searchText = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  viewDetails(log: Log): void {
    console.log('Viewing details for log:', log);
    // Implement view details functionality
  }

}
