import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskdetailsComponent } from 'src/app/dialogs/taskdetails/taskdetails.component';
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
  email: string = '';
  editingTaskId: number | null = null;
  isSuperAdmin: boolean = false; 

  constructor(
    private taskserv : TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

    if (role === "SUPER_ADMIN") {
      this.isSuperAdmin = true;
      this.loadSuperAdminTasks(this.email);
    } else if (role === "ADMIN") {
      this.loadAdminTasks(this.email);
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

  deleteTask(idtask: number) {
    this.taskserv.deleteTache(idtask, this.email).subscribe(
      (response) => {
        console.log("Task deleted successfully:", response);
        
        this.listoftasks = this.listoftasks.filter(task => task.idTache !== idtask);
      },
      (error) => {
        console.error("Error deleting task:", error);
        this.listoftasks = this.listoftasks.filter(task => task.idTache !== idtask);
      }
    );
  }
  
  


  updateTask(idtask: number, task: Tache) { 
    this.taskserv.updateTask(task,idtask).subscribe(() => {
      this.editingTaskId = null; 
    }, (error) => console.log(error)
  );
  }

  toggleEdit(taskId: number) {
    this.editingTaskId = taskId === this.editingTaskId ? null : taskId;
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

  openTaskDetailsDialog(idtask : number){
    const dialogRef = this.dialog.open(TaskdetailsComponent, {
      data: { idtask: idtask }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }
}
