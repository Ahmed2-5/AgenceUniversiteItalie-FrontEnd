import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireCredentialService {

  private baseUrl = 'http://localhost:8082/api/commentaireCredential';
  
    constructor(private http: HttpClient) {}
  
    addComment(credentialId: number, contenu: string, userEmail: string): Observable<any> {
      const commentRequest = { credentialId: credentialId.toString(), contenu };
      return this.http.post<any>(`${this.baseUrl}/addCommentaire?userEmail=${userEmail}`, commentRequest);
    }
  
    GetCommentsByCredential(credentialId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/credential/${credentialId}`);
    }
  
    deleteComment(commentId: number, userEmail: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${commentId}?userEmail=${userEmail}`);
    }
}
