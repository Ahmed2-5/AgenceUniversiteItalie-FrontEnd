import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private baseUrl = 'http://localhost:8082/api/commentaire';

  constructor(private http: HttpClient) {}

  addComment(tacheId: number, contenu: string, userEmail: string): Observable<any> {
    const commentRequest = { tacheId: tacheId.toString(), contenu };
    return this.http.post<any>(`${this.baseUrl}/addCommentaire?userEmail=${userEmail}`, commentRequest);
  }

  getCommentsByTache(tacheId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tache/${tacheId}`);
  }

  deleteComment(commentId: number, userEmail: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${commentId}?userEmail=${userEmail}`);
  }
}
