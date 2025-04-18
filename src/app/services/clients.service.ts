import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../models/Clients.model';
import { Observable } from 'rxjs';
import { ClientDocument } from '../models/ClientDocument.model';
import { Payement } from '../models/Payement.model';
import { Tranche } from '../models/Tranche.model';

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

  archiveClient(idClient: number): Observable<Clients> {
    return this.http.put<Clients>(`${this.baseUrl}/${idClient}/archive`, {});
  }

  // 🔓 Unarchive client
  unarchiveClient(idClient: number): Observable<Clients> {
    return this.http.put<Clients>(`${this.baseUrl}/${idClient}/Unarchive`, {});
  }

  private apiUrl = 'http://localhost:8082/api/documents';

  // ✅ Upload Document
  uploadDocument(file: File, nom: string, idClient: number, idUtilisateur: number): Observable<ClientDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('idClient', idClient.toString());
    formData.append('idUtilisateur', idUtilisateur.toString());

    return this.http.post<ClientDocument>(`${this.apiUrl}`, formData);
  }

  // ✅ Get All Documents of a Client
  getDocumentsByClient(idClient: number): Observable<ClientDocument[]> {
    return this.http.get<ClientDocument[]>(`${this.apiUrl}/Client/Documents/${idClient}`);
  }

  // ✅ Get Document by ID
  getDocumentById(id: number): Observable<ClientDocument> {
    return this.http.get<ClientDocument>(`${this.apiUrl}/${id}`);
  }

  // ✅ Rename a Document
  renameDocument(id: number, nouveauNom: string): Observable<ClientDocument> {
    const params = new HttpParams().set('nouveauNom', nouveauNom);
    return this.http.patch<ClientDocument>(`${this.apiUrl}/rename/${id}`, null, { params });
  }

  // ✅ Delete a Document
  deleteDocument(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  downloadFile(idDocument: number): Observable<Blob> {
    const url = `${this.apiUrl}/${idDocument}/download`;

    // Send GET request to backend API to download the file
    return this.http.get(url, { responseType: 'blob' });
  }

  replaceDocument(idDocument: number, formData: FormData): Observable<ClientDocument> {
    return this.http.patch<ClientDocument>(`${this.apiUrl}/replace/${idDocument}`, formData);
  }
  

  private apiUrl1 = 'http://localhost:8082/api/paiements';

  // 1. Créer un paiement
  createPaiement(clientId: number, montant: number, nombreTranches: number): Observable<Payement> {
    const body = {
      clientId: clientId,
      montant: montant,
      nombreTranches: nombreTranches
    };
    return this.http.post<Payement>(`${this.apiUrl1}/ajouterPayment`, body);
  }

  // 2. Récupérer tous les paiements d’un client
  getPaiementsByClient(clientId: number): Observable<Payement[]> {
    return this.http.get<Payement[]>(`${this.apiUrl1}/client/${clientId}`);
  }

  // 3. Récupérer toutes les tranches d’un paiement
  getTranchesByPaiement(paiementId: number): Observable<Tranche[]> {
    return this.http.get<Tranche[]>(`${this.apiUrl1}/${paiementId}/Tranches`);
  }

  // 4. Régler une tranche
  payerTranche(trancheId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl1}/Tranches/${trancheId}/payer`, {});
  }

  getResteAPayer(paiementId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl1}/${paiementId}/reste`);
  }
}
