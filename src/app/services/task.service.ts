import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../dialogs/addtask/addtask.component';
import { Observable } from 'rxjs';
import { Tache } from '../models/Tache.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8082/api/Taches';

  constructor(private httpclt: HttpClient,private dialog: MatDialog) {}

  openAddtaskDialog(): void {

    const dialogRef = this.dialog.open(AddtaskComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

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
    return this.httpclt.put<Tache>(`${this.baseUrl}/${id}/status?adminEmail=${adminEmail}`, statusRequest, { headers });
  }

  // Delete Tache
  deleteTache(id: number, superAdminEmail: string): Observable<any> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.delete(`${this.baseUrl}/${id}?superAdminEmail=${superAdminEmail}`, { headers });
  }
}
