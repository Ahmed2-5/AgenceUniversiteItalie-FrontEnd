import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../dialogs/addtask/addtask.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpclt: HttpClient,private dialog: MatDialog) {}

openAddtaskDialog(): void {

    const dialogRef = this.dialog.open(AddtaskComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
