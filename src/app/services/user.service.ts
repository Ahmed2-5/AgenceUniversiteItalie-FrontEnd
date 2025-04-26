import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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

  createAdmin(admin: Utilisateur, superAdminEmail: string, roleToAssign: string): Observable<Utilisateur> {
    const token = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    return this.httpclt.post<Utilisateur>(
      `${this.baseUrl}/create-Admin?superAdminEmail=${superAdminEmail}&roleToAssign=${roleToAssign}`,
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

  activateAccount(email: string): Observable<string> {
    const token = sessionStorage.getItem('jwt'); 
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('email', email);
  
    return this.httpclt.get<string>(`${this.baseUrl}/activer-compte`, { headers, params});
  }
  
  deactivateAccount(email: string): Observable<string> {
    const token = sessionStorage.getItem('jwt'); 
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('email', email);
  
    return this.httpclt.get<string>(`${this.baseUrl}/desactiver-compte`, { headers, params});
  }
  
  uploadProfileImage( file: File,userId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpclt.post(`${this.baseUrl}/upload-profile-image/${userId}`, formData, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Upload error:', error);
    return throwError(() => new Error('File upload failed. Please try again.'));
  }

  getProfileImage(filename: string): Observable<Blob> {
    return this.httpclt.get(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' });
  }

  getUtilisateurByRole_LibelleRole(libelleRole: string): Observable<any> {
    return this.httpclt.get<any>(`${this.baseUrl}/getUtilisateurByRole_LibelleRole/${libelleRole}`);
  }

  convertUsersToIds(users: any[]): Observable<number[]> {
    return this.httpclt.post<number[]>(`${this.baseUrl}/convertUsersToIds`, users);
  }

  getCountOfAdmins(): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countAdmins`);
  }

  countUsers(): Observable<number> {
    return this.httpclt.get<number>(`${this.baseUrl}/countUsers`);
  }
}
