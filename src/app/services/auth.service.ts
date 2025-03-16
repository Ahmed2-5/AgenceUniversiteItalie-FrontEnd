import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/authn';


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(`${this.baseUrl}/login`, { email , mdp: password }, { headers });
  }

  signup(user: any): Observable<any> {
    const headers = new HttpHeaders( {'Content-type': 'application/json'});
    return this.http.post(`${this.baseUrl}/signup`, user , {headers});
  }

}
