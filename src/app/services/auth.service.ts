import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/utilisateurs';
  private baseUrl2 = 'http://localhost:8082/api/password'; 

  constructor(private httpclt: HttpClient) {}

  createUserWithRole(
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    role: string,
    superAdminEmail: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('superAdminEmail', superAdminEmail);
    const body = { nom, prenom, email, motDePasse, role };

    return this.httpclt.post<any>(`${this.baseUrl}/createUserWithRole`, body, { headers, params }).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error || '❌ Erreur lors de la création de l\'utilisateur.'));
      })
    );
  }

  login(adresseMail: string, motDePasse: string): Observable<{ token: string; email: string; role: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { adresseMail, motDePasse };

    return this.httpclt.post<{ token: string; email: string; role: string }>(
      `${this.baseUrl}/login`,
      body,
      { headers }
    ).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error || '❌ Email ou mot de passe incorrect.'));
      })
    );
  }

  saveUser(token: string, email: string, role: string) {
    sessionStorage.setItem("jwt", token);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("role", role);
  }
  
  forgotPassword(email: string): Observable<void> {
    return this.httpclt.post<void>(`${this.baseUrl2}/forgot`, null, { params: { email } });
  }

  
  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<void> {
    return this.httpclt.post<void>(`${this.baseUrl2}/reset`, null, {
      params: { token, newPassword, confirmPassword }
    }).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error || '❌ Échec de la réinitialisation du mot de passe.'));
      })
    );
  }

  logout(){
    sessionStorage.clear()
  }
  
  getUtilisateurByEmail(email: string): Observable<any> {
    return this.httpclt.get(`${this.baseUrl}/email`, { params: { email } });
  }

  
}
