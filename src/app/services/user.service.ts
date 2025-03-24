import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdduserComponent } from '../dialogs/adduser/adduser.component';
import { MatDialog } from '@angular/material/dialog';
import { Utilisateur } from '../models/Utilisateur.model';
import { Role } from '../models/Role.model';
import { UpdateuserComponent } from '../dialogs/updateuser/updateuser.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/api/utilisateurs';
  
  constructor(private httpclt: HttpClient,private dialog: MatDialog) {}

  createAdmin(admin: Utilisateur, superAdminEmail: string): Observable<Utilisateur> {
    const token = sessionStorage.getItem('jwt'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    return this.httpclt.post<Utilisateur>(
      `${this.baseUrl}/create-Admin?superAdminEmail=${superAdminEmail}`,
      admin, 
      { headers }
    );
  }
  
  
  

  getAllUtilisateurs(): Observable<any[]> {
    const token = sessionStorage.getItem('jwt'); 
    
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.get<any[]>('http://localhost:8082/api/utilisateurs/alluser', { headers });
  }

  getUserById(id: number): Observable<any> {
    const token = sessionStorage.getItem('jwt'); 
    
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  updateUserById(id: number, user: any): Observable<any> {
    const token = sessionStorage.getItem('jwt'); 
    
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclt.put<any>(`${this.baseUrl}/updateUtilisateurByIdu/${id}`, user, { headers });
  }

  updateProfileByIdu(id: number, user: any): Observable<any> {    
    return this.httpclt.put<any>(`${this.baseUrl}/updateProfileByIdu/${id}`, user);
  }
  
  openAdduserDialog(): void {

    const dialogRef = this.dialog.open(AdduserComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  openUpdateDialog(userId: number): void {

    const dialogRef = this.dialog.open(UpdateuserComponent, {
      data: { userId } 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  closeDialog(): void {

    this.dialog.closeAll();
  }

  getRoleByLibelleRole(libelleRole: string): Observable<Role> {
    return this.httpclt.get<Role>(`${this.baseUrl}/getRoleByLib/${libelleRole}`);
  }

  
}
