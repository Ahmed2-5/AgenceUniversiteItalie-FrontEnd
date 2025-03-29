import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskRequest } from 'src/app/models/TaskRequest.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { TaskService } from 'src/app/services/task.service';
import { Tache } from './../../models/Tache.model';
import { UserslistforaddtaskComponent } from '../userslistforaddtask/userslistforaddtask.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  taskForm!: FormGroup;
  taskrequest: TaskRequest = new TaskRequest();
  selectedUsersIDs: number[] = [];
  selectedUsers: Utilisateur[] = [];
  selectedSetUsers: Set<Utilisateur> = new Set<Utilisateur>();
  email: string = '';


  constructor(private fb: FormBuilder,
              private taskserv: TaskService,
              private userserv: UserService,
              private dialog: MatDialog
            ) {
    this.taskForm = this.fb.group({
      "title": ['', Validators.required],
      "description": ['', Validators.required],
      "deadline": ['', Validators.required],
      "priority": ['Aucun', Validators.required],

    });

    this.taskrequest.task = new Tache();
  }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.loadUsers()
  }

  loadUsers(){

    this.selectedUsers = Array.from(this.selectedSetUsers);
  }
  loadusersIDs(){
    this.userserv.convertUsersToIds(this.selectedUsers).subscribe((d)=>{
      this.selectedUsersIDs=d
      console.log(this.selectedUsersIDs)
})
  }
  onSubmit() {
    
    if (!this.taskrequest.task) {
        this.taskrequest.task = new Tache();
    }

    this.taskrequest.task.titre = this.taskForm.controls['title'].value;
    this.taskrequest.task.description = this.taskForm.controls['description'].value;
    this.taskrequest.task.dueDate = this.taskForm.controls['deadline'].value
    this.taskrequest.task.priority = this.taskForm.controls['priority'].value

    
    this.taskrequest.usersIDs = this.selectedUsersIDs;
    
    this.taskserv.createTache(this.taskrequest.task,this.email,this.taskrequest.usersIDs).subscribe(
        (response: any) => {
            console.log(response);
            this.resetForm();  
            this.closeDialog();
        },
        (error) => {
            console.error(error);
        }
    );
}

formatDateForServer(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  let hours = ('0' + date.getHours()).slice(-2); 
  const minutes = ('0' + date.getMinutes()).slice(-2);

  hours = (parseInt(hours, 10) - 1).toString().padStart(2, '0');

  const offset = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(offset / 60));
  const offsetMinutes = Math.abs(offset % 60);

  const sign = offset >= 0 ? '-' : '+';

  return `${year}-${month}-${day} ${hours}:${minutes}${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
}

  openUsersDialog(): void {
    const dialogRef = this.dialog.open(UserslistforaddtaskComponent, {
      data: { selectedSetUsers: this.selectedSetUsers }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedSetUsers = result;
        this.loadUsers();
        this.loadusersIDs()
        console.log('Dialog closed with result:', result);
      }
    });
  }
  

  closeDialog(): void {
    this.userserv.closeDialog();
    location.reload()
  }

  getUserImage(user: Utilisateur): string {
    return `${user.profileImageUrl}`;
  }

  removeUser(user:Utilisateur){
    this.selectedSetUsers.delete(user);
    this.loadUsers()
    this.loadusersIDs()
  }

  resetForm(): void {
    this.taskForm.reset();
    this.selectedSetUsers.clear();
    this.selectedUsers = [];
    this.selectedUsersIDs = [];
  }
  
}