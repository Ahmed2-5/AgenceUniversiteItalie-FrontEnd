import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from 'src/app/dialogs/comments/comments.component';
import { TaskdetailsComponent } from 'src/app/dialogs/taskdetails/taskdetails.component';
import { Tache } from 'src/app/models/Tache.model';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

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
  TaskDates: Set<Date> = new Set<Date>();
  deadlinelist: Set<Date> = new Set<Date>();
  selectedStatus: string = 'PAS_ENCORE';  // Default status filter


  constructor(
    private taskserv : TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role') || '{}'; // Ensure role is properly parsed

    if (role === "SUPER_ADMIN") {
      this.isSuperAdmin = true;
      this.loadTasks();
    } else if (role === "ADMIN_TUNISIE" || role === "ADMIN_ITALIE") {
      this.loadAdminTasks(this.email);
    }
    
  }

  // Fetch tasks created by SuperAdmin
  loadSuperAdminTasks(superAdminEmail: string) {
    this.taskserv.getAllTachesCreatedBySuperAdmin(superAdminEmail).subscribe(
      (tasks: Tache[]) => {
        this.listoftasks = tasks;
        this.TaskDates = new Set<Date>(tasks.map(task => new Date(task.dateCreation)));
        this.deadlinelist = new Set<Date>(tasks.map(task => new Date(task.dueDate)));
      },
      (error) => {
        console.error('Error fetching tasks for Super Admin:', error);
      }
    );
  }

  loadTasks() {
    this.taskserv.getAllTaches().subscribe(
      (tasks: Tache[]) => {
        this.listoftasks = tasks;
        this.TaskDates = new Set<Date>(tasks.map(task => new Date(task.dateCreation)));
        this.deadlinelist = new Set<Date>(tasks.map(task => new Date(task.dueDate)));
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
        this.TaskDates = new Set<Date>(tasks.map(task => new Date(task.dateCreation)));
        this.deadlinelist = new Set<Date>(tasks.map(task => new Date(task.dueDate)));
      },
      (error) => {
        console.error('Error fetching tasks for Admin:', error);
      }
    );
  }

  filterTasks() {
    return this.listoftasks.filter(task => {
      const matchesSearch = !this.searchTerm.trim() || task.titre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'ALL' || task.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  setStatusFilter(status: string) {
    this.selectedStatus = status;
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
  
  confirmArchiveBox(idtask: number) {
         Swal.fire({
           title: 'Are you sure you want to delete this task?',
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: 'Yes, delete it',
           cancelButtonText: 'No, keep it'
         }).then((result) => {
           if (result.value) {
             this.deleteTask(idtask); // Activate user
           }
         });
       }
  


  updateTask(idtask: number, task: Tache) { 
    console.log("Updated Task Priority:", task.priority); // Debugging step
    this.taskserv.updateTask(task, idtask).subscribe(
      () => {
        this.editingTaskId = null; 
      }, 
      (error) => console.log(error)
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

  getPriorityBadge(priority: string): string {
    switch (priority) {
      case 'Aucun': return 'A';
      case 'Faible': return 'F';
      case 'Moyenne': return 'M';
      case 'Elevée': return 'E';
      default: return '-';
    }
  }
  

  getTaskDate(index: number): Date {
    const taskDateArray = Array.from(this.TaskDates);
    return taskDateArray[index];
  }

  getDeadline(index: number): Date {
    const taskDateArray = Array.from(this.deadlinelist);
    return taskDateArray[index];
  }

  getDeadlineTimeDifference(idtask: number): string {
    const currentDate = new Date(); 
    const Deadline = this.getDeadline(idtask); 
  
    let timeDifference = Math.round(Math.abs(currentDate.getTime() - Deadline.getTime()) / 1000);
  
    // Check if the task is already finished (negative time difference)
    if (currentDate.getTime() > Deadline.getTime()) {
      return "Finished";
    }
  
    const years = Math.floor(timeDifference / (3600 * 24 * 365.25));
    if (years > 0) {
      return `${years} y`;
    }
    timeDifference -= years * 3600 * 24 * 365.25;
  
    const months = Math.floor(timeDifference / (3600 * 24 * 30.44));
    if (months > 0) {
      return `${months} month`;
    }
    timeDifference -= months * 3600 * 24 * 30.44;
  
    const days = Math.floor(timeDifference / (3600 * 24));
    if (days > 0) {
      return `${days} days`;
    }
    timeDifference -= days * 3600 * 24;
  
    const hours = Math.floor(timeDifference / 3600);
    if (hours > 0) {
      return `${hours} hours`;
    }
    timeDifference -= hours * 3600;
  
    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
      return `${minutes} min`;
    }
  
    const seconds = Math.floor(timeDifference % 60);
    return `${seconds} s`;
  }
  

  getTimeDifference(idtask: number): string {
    const currentDate = new Date(); 
    const TaskDate = this.getTaskDate(idtask);
  
    let timeDifference = Math.round(Math.abs(currentDate.getTime() - TaskDate.getTime()) / 1000);
  
    const years = Math.floor(timeDifference / (3600 * 24 * 365.25));
    if (years > 0) {
      return `${years}y`;
    }
    timeDifference -= years * 3600 * 24 * 365.25;
  
    const months = Math.floor(timeDifference / (3600 * 24 * 30.44));
    if (months > 0) {
      return `${months}month`;
    }
    timeDifference -= months * 3600 * 24 * 30.44;
  
    const days = Math.floor(timeDifference / (3600 * 24));
    if (days > 0) {
      return `${days}d`;
    }
    timeDifference -= days * 3600 * 24;
  
    const hours = Math.floor(timeDifference / 3600);
    if (hours > 0) {
      return `${hours}h`;
    }
    timeDifference -= hours * 3600;
  
    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
      return `${minutes}min`;
    }
  
    const seconds = Math.floor(timeDifference % 60);
    return `${seconds}s`;
  }

  openDialog(): void {
    this.taskserv.openAddtaskDialog();
  }

  openCommentDialog(idtask: number) {
    const dialogRef = this.dialog.open(CommentsComponent, {
      data: { taskID: idtask },
      disableClose: true, // This ensures the dialog closes when clicking outside
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }
  
  openTaskDetailsDialog(idtask: number) {
    const dialogRef = this.dialog.open(TaskdetailsComponent, {
      data: { idtask: idtask },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }
  
}
