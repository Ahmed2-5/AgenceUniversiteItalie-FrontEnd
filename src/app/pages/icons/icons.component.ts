import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/models/Tache.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  searchTerm: string = '';
  listoftasks: Tache[] = [];
 

  constructor(
    private taskserv : TaskService
  ) {}

  ngOnInit() {
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

    if (role === "SUPER_ADMIN") {
      this.loadSuperAdminTasks(email);
    } else if (role === "ADMIN") {
      this.loadAdminTasks(email);
    }
  }

  // Fetch tasks created by SuperAdmin
  loadSuperAdminTasks(superAdminEmail: string) {
    this.taskserv.getAllTachesCreatedBySuperAdmin(superAdminEmail).subscribe(
      (tasks: Tache[]) => {
        this.listoftasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks for Super Admin:', error);
      }
    );
  }

  // Fetch tasks assigned to Admin
  loadAdminTasks(adminEmail: string) {
    this.taskserv.getTachesAssignedToAdmin(adminEmail).subscribe(
      (tasks: Tache[]) => {
        this.listoftasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks for Admin:', error);
      }
    );
  }

  filterTasks() {
    if (!this.searchTerm.trim()) {
      return this.listoftasks;
    }
    return this.listoftasks.filter(task =>
      task.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTaskStatusClass(status: string) {
    switch (status) {
      case 'PAS_ENCORE': return 'bg-light-blue';
      case 'DONE': return 'bg-green';
      case 'EN_COURS': return 'bg-light-red';
      default: return 'bg-secondary';
    }
  }

  openDialog(): void {
    this.taskserv.openAddtaskDialog();
  }
}
