import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
=======
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
<<<<<<< HEAD
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
=======

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
}
