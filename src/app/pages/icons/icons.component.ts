import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  searchTerm: string = '';
  listoftasks = [
    { taskTitle: 'Task 1', taskDescription: 'Description for Task 1', timeAgo: '2 hours ago', deadline: '3 days left', taskstatus: 'In Progress' },
    { taskTitle: 'Task 2', taskDescription: 'Description for Task 2', timeAgo: '5 hours ago', deadline: '1 day left', taskstatus: 'Completed' },
    { taskTitle: 'Task 3', taskDescription: 'Description for Task 3', timeAgo: '1 day ago', deadline: 'Expired', taskstatus: 'Expired' }
  ];

  constructor(
    private taskserv : TaskService
  ) {}

  ngOnInit() {}

  filterTasks() {
    if (!this.searchTerm.trim()) {
      return this.listoftasks;
    }
    return this.listoftasks.filter(task =>
      task.taskTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTaskStatusClass(status: string) {
    switch (status) {
      case 'In Progress': return 'bg-light-blue';
      case 'Completed': return 'bg-green';
      case 'Expired': return 'bg-light-red';
      default: return 'bg-secondary';
    }
  }

  openDialog(): void {
    this.taskserv.openAddtaskDialog();
  }
}
