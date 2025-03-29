import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tache } from 'src/app/models/Tache.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})
export class TaskdetailsComponent implements OnInit {

  idtask!: number;
  task: Tache = new Tache();
  users: Utilisateur[] = [];
  usr: Utilisateur = new Utilisateur();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idtask: number },
              private taskserv: TaskService,
              private dialogRef: MatDialogRef<TaskdetailsComponent>,
              private route: Router
            ) {}

  ngOnInit(): void {
    this.idtask = this.data.idtask;

    this.taskserv.getTacheById(this.idtask).subscribe((data) => {
      console.log(data)
      this.task = data;
      this.task.dateCreation = new Date(this.task.dateCreation); 
      this.task.dueDate = new Date(this.task.dueDate); 
    });
    this.taskserv.FindUsersFromIdtask(this.idtask).subscribe((data) => {
      this.users = data.map(user => ({
        ...user,
        profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${user.profileImageUrl}`
      }));
    });
  }

  getDeadlineTimeDifference(): string {
   

    const timeDifference = Math.abs(this.task.dueDate.getTime() - this.task.dateCreation.getTime()) / 1000;

    const years = Math.floor(timeDifference / (3600 * 24 * 365.25));
    if (years > 0) {
      return `${years} y`;
    }

    const months = Math.floor(timeDifference / (3600 * 24 * 30.44));
    if (months > 0) {
      return `${months} mo`;
    }

    const days = Math.floor(timeDifference / (3600 * 24));
    if (days > 0) {
      return `${days} days`;
    }

    const hours = Math.floor(timeDifference / 3600);
    if (hours > 0) {
      return `${hours -1} hours`;
    }

    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
      return `${minutes} min`;
    }

    const seconds = Math.floor(timeDifference);
    return `${seconds} s`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
  getTaskStatusClass(status: string) {
    switch (status) {
      case 'PAS_ENCORE': return 'bg-light-blue';
      case 'DONE': return 'bg-green';
      case 'EN_COURS': return 'bg-light-red';
      default: return 'bg-secondary';
    }
  }

  getPriorityBadgeClass(priority: string) {
    switch (priority) {
      case 'Faible':
        return 'bg-success';  // Green for low priority
      case 'Moyenne':
        return 'bg-warning';  // Yellow for medium priority
      case 'EleVée':
        return 'bg-danger';   // Red for high priority
      default:
        return 'bg-secondary'; // Grey for no priority
    }
  }
  

}