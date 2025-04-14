import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../models/Clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl = 'http://localhost:8082/api/Clients';

  constructor(private http: HttpClient) { }

  // ➕ Create a client
  createClient(client: Clients, adminEmail: string, assignedAdminEmail: string): Observable<Clients> {
    const params = new HttpParams()
      .set('adminEmail', adminEmail)
      .set('AssignedAdminEmail', assignedAdminEmail);

    return this.http.post<Clients>(`${this.baseUrl}/CreateClient`, client, { params });
  }

  // 🔁 Update client
  updateClient(clientDetails: Clients, idClient: number): Observable<Clients> {
    return this.http.put<Clients>(`${this.baseUrl}/UpdateClients/${idClient}`, clientDetails);
  }

  // ❌ Delete client
  deleteClient(idC: number, adminEmail: string): Observable<any> {
    const params = new HttpParams().set('adminEmail', adminEmail);
    return this.http.delete(`${this.baseUrl}/deleteClient/${idC}`, { params });
  }

  // 📋 Get all clients
  getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.baseUrl}/AllClients`);
  }

  // 🔍 Get client by ID
  getClientById(idClient: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.baseUrl}/getclientById/${idClient}`);
  }
}
