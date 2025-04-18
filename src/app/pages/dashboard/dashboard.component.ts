import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalAdmins: number = 0;
  totalTasks: number = 0;
  tasksEnCours: number = 0;
  tasksDone: number = 0;
  totalTasksByIdADMIN: number = 0;
  tasksEnCoursByIdADMIN: number = 0;
  tasksDoneByIdADMIN: number = 0;
  tasksEnCoursPercentage: number = 0;
  tasksDonePercentage: number = 0;

  isSuperAdmin: boolean = false;
  user:Utilisateur=new Utilisateur()

  constructor(private taskService: TaskService,
     private authserv: AuthService,
     private userserv: UserService,

    ) {}

  ngOnInit(): void {
    this.userserv.getCountOfAdmins().subscribe((data)=>{
      this.totalAdmins =data
  });
    this.getUserRole();
  }

  getUserRole(): void {
    const role = sessionStorage.getItem('role'); // Fetch role from session storage (SuperAdmin or Admin)
    const email = sessionStorage.getItem('email');
  
    if (email) {
      this.authserv.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data;  // Now we have the correct user data
          
          if (role === 'SUPER_ADMIN') {
            this.isSuperAdmin = true;
            this.loadSuperAdminTasks();
          } else if (role === 'ADMIN') {
            this.isSuperAdmin = false;
            this.loadAdminTasks(this.user.idUtilisateur); // Now we have the correct ID
          }
        },
        error: (error) => {
          console.error("Error fetching user:", error);
        }
      });
    }
  }
  

  loadSuperAdminTasks(): void {
    this.taskService.getAllTasksCount().subscribe(total => {
      this.totalTasks = total;
      this.taskService.getTasksEnCoursCount().subscribe(enCours => {
        this.tasksEnCours = enCours;
        this.calculatePercentages();
      });
      this.taskService.getTasksDoneCount().subscribe(done => {
        this.tasksDone = done;
        this.calculatePercentages();
      });
    });
  }

  loadAdminTasks(userId: number): void {
    this.taskService.countAllTasksAssignedByUser(userId).subscribe(total => {
      this.totalTasksByIdADMIN = total;
      this.taskService.countTasksEnCoursByUser(userId).subscribe(enCours => {
        this.tasksEnCoursByIdADMIN = enCours;
        this.calculatePercentages();
      });
      this.taskService.countTasksDoneByUser(userId).subscribe(done => {
        this.tasksDoneByIdADMIN = done;
        this.calculatePercentages();
      });
    });
  }

  private calculatePercentages(): void {
    let total = this.isSuperAdmin ? this.totalTasks : this.totalTasksByIdADMIN;
    let enCours = this.isSuperAdmin ? this.tasksEnCours : this.tasksEnCoursByIdADMIN;
    let done = this.isSuperAdmin ? this.tasksDone : this.tasksDoneByIdADMIN;

    if (total > 0) {
      this.totalTasks = total;
      this.tasksEnCoursPercentage = (enCours / total) * 100;
      this.tasksDonePercentage = (done / total) * 100;
    }
  }
}
