import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

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
  tasksEnCoursPercentage: number = 0;
  tasksDonePercentage: number = 0;

  constructor(private userserv: UserService,
              private taskService: TaskService
  ) {}

  ngOnInit(): void {  
    this.userserv.getCountOfAdmins().subscribe((data)=>{
        this.totalAdmins =data
    });
    this.taskService.getAllTasksCount().subscribe((total) => {
      this.totalTasks = total;

      this.taskService.getTasksEnCoursCount().subscribe((enCours) => {
        this.tasksEnCours = enCours;
        this.calculatePercentages();
      });

      this.taskService.getTasksDoneCount().subscribe((done) => {
        this.tasksDone = done;
        this.calculatePercentages();
      });

    });
  }

  private calculatePercentages(): void {
    if (this.totalTasks > 0) {
      this.tasksEnCoursPercentage = (this.tasksEnCours / this.totalTasks) * 100;
      this.tasksDonePercentage = (this.tasksDone / this.totalTasks) * 100;
    }
  }


}
