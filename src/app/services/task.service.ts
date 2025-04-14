<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../dialogs/addtask/addtask.component';
import { Observable } from 'rxjs';
import { Tache } from '../models/Tache.model';
import { Utilisateur } from '../models/Utilisateur.model';
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../dialogs/addtask/addtask.component';
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

@Injectable({
  providedIn: 'root'
})
export class TaskService {

<<<<<<< HEAD
  private baseUrl = 'http://localhost:8082/api/Taches';

  constructor(private httpclt: HttpClient,private dialog: MatDialog) {}

  openAddtaskDialog(): void {
=======
  constructor(private httpclt: HttpClient,private dialog: MatDialog) {}

openAddtaskDialog(): void {
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

    const dialogRef = this.dialog.open(AddtaskComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
<<<<<<< HEAD

  // Create Tache
  createTache(tache: Tache, superAdminEmail: string, adminIds: number[]): Observable<Tache> {
    const body = { ...tache };
    const token = sessionStorage.getItem('jwt'); 
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.post<Tache>(`${this.baseUrl}/CreateTache?superAdminEmail=${superAdminEmail}`, body, {  
        headers,
        params: { adminIds: adminIds.join(',')  }
    });
  }

  // Get Tache by ID
  getTacheById(id: number): Observable<Tache> {
    return this.httpclt.get<Tache>(`${this.baseUrl}/gettacheById/${id}`);
  }

  // Get all Taches created by SuperAdmin
  getAllTachesCreatedBySuperAdmin(superAdminEmail: string): Observable<Tache[]> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.get<Tache[]>(`${this.baseUrl}/getAllTachesCreatedBySuperAdmin?superAdminEmail=${superAdminEmail}`, { headers });
  }

  // Get all Taches assigned to Admin
  getTachesAssignedToAdmin(adminEmail: string): Observable<Tache[]> {
    return this.httpclt.get<Tache[]>(`${this.baseUrl}/getAllTachesOfAdmin?adminEmail=${adminEmail}`);
  }

  // Update Task Status by Admin
  updateTacheStatus(id: number, status: string, adminEmail: string): Observable<Tache> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const statusRequest = { status: status.toString() };
    return this.httpclt.put<Tache>(`${this.baseUrl}/status/${id}?adminEmail=${adminEmail}`, statusRequest, { headers });
  }

  addTaskToUser(idtask: number, iduser: number): Observable<any> {
    return this.httpclt.post(`${this.baseUrl}/addTasktToUser/${idtask}/${iduser}`, {});
  }

  getUserTakenByIdtask(idtask: number): Observable<Utilisateur> {
    return this.httpclt.get<Utilisateur>(`${this.baseUrl}/getUserTakedByIdtask/${idtask}`);
  }

  updateTask(task: Tache,idtask: number): Observable<Tache> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.put<Tache>(`${this.baseUrl}/updateTask/${idtask}`, task, { headers });
  }

  // Delete Tache
  deleteTache(id: number, superAdminEmail: string): Observable<any> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.delete(`${this.baseUrl}/${id}?superAdminEmail=${superAdminEmail}`, { headers });
  }

  FindUsersFromIdtask(idtask: number): Observable<Utilisateur[]> {
    return this.httpclt.get<Utilisateur[]>(`${this.baseUrl}/FindUsersFromIdtask/${idtask}`);
  }

  getAllTasksCount(): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countAll`);
  }
  
  getTasksEnCoursCount(): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countEnCours`);
  }
  
  getTasksDoneCount(): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countDone`);
  }
  
  countAllTasksAssignedByUser(userId: number): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countAllTasksAssignedByUser/${userId}`);
  }

  countTasksEnCoursByUser(userId: number): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countTasksEnCoursByUser/${userId}`);
  }

  countTasksDoneByUser(userId: number): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countTasksDoneByUser/${userId}`);
  }
=======
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
}
