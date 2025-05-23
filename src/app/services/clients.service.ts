import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../models/Clients.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ClientDocument } from '../models/ClientDocument.model';
import { Payement } from '../models/Payement.model';
import { Tranche } from '../models/Tranche.model';
import { Credential } from '../models/Credential.model';
import { UniversiteCredential } from '../models/UniversiteCredential.model';
import { RDV } from '../models/RDV.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl = 'http://localhost:8082/api/Clients';

  constructor(private http: HttpClient) { }

  // ➕ Create a client
  createClient(client: Clients, adminEmail: string, assignedAdminTunisie: string): Observable<Clients> {
    
    const params = new HttpParams()
      .set('adminEmail', adminEmail)
      .set('assignedAdminTunisie', assignedAdminTunisie)
    return this.http.post<Clients>(`${this.baseUrl}/CreateClient`, client, { params });
  }

  // 🔁 Update client
  updateClient(clientDetails: Clients, idClient: number, updatedByEmail :string): Observable<Clients> {
    const params = new HttpParams()
      .set('updatedByEmail', updatedByEmail)
    return this.http.put<Clients>(`${this.baseUrl}/UpdateClients/${idClient}`, clientDetails, { params });
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

  getClientsByAssignedToTunisie(mail: string): Observable<Clients[]> {
    const params = new HttpParams().set('mail', mail);
    return this.http.get<Clients[]>(`${this.baseUrl}/assignedToTunisie`, { params });
  }

  getClientsByAssignedToItalie(mail: string): Observable<Clients[]> {
    const params = new HttpParams().set('mail', mail);
    return this.http.get<Clients[]>(`${this.baseUrl}/assignedToItalie`, { params });
  }
  
  archiveClient(idClient: number,authEmail :string): Observable<Clients> {
    const params = new HttpParams().set('authEmail', authEmail);
    return this.http.put<Clients>(`${this.baseUrl}/${idClient}/archive`,null, {params});
  }

  // 🔓 Unarchive client
  unarchiveClient(idClient: number): Observable<Clients> {
    return this.http.put<Clients>(`${this.baseUrl}/${idClient}/Unarchive`, {});
  }

  // 📌 Assign client to Admin Italie
  assignClientToAdminItalie(clientId: number, adminEmail: string): Observable<Clients> {
    return this.http.post<Clients>(`${this.baseUrl}/${clientId}/assign-italie?adminEmail=${adminEmail}`, {});
  }

  // 📌 Remove client from Admin Italie
  removeClientFromAdminItalie(clientId: number, adminEmail: string): Observable<Clients> {
    return this.http.post<Clients>(`${this.baseUrl}/${clientId}/remove-italie?adminEmail=${adminEmail}`, {});
  }

  UpdateAssignClientToAdminTunisie(clientId: number, adminEmail: string,superadminEmail: string): Observable<Clients> {
    return this.http.post<Clients>(`${this.baseUrl}/${clientId}/updateassign-tunisie?adminEmail=${adminEmail}&superadminEmail=${superadminEmail}`, {});
  }

  uploadProfileImage( file: File,clientId: number): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);
  
      return this.http.post(`${this.baseUrl}/upload-profile-image/${clientId}`, formData, { responseType: 'text' }).pipe(
        map(response => response as string),
        catchError(this.handleError)
      );
    }
  
    private handleError(error: HttpErrorResponse) {
      console.error('Upload error:', error);
      return throwError(() => new Error('File upload failed. Please try again.'));
    }
  
    getProfileImage(filename: string): Observable<Blob> {
      return this.http.get(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' });
    }
  private apiUrl = 'http://localhost:8082/api/documents';

  // ✅ Upload Document
  uploadDocument(file: File, nom: string, idClient: number, idUtilisateur: number,authEmail: string): Observable<ClientDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('idClient', idClient.toString());
    formData.append('idUtilisateur', idUtilisateur.toString());
    formData.append('authEmail', authEmail);
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
  renameDocument(id: number, nouveauNom: string, authEmail: string): Observable<ClientDocument> {
    const params = new HttpParams()
    .set('nouveauNom', nouveauNom)
    .set('authEmail', authEmail)
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
  
  archiveDoc(idDOc: number, authEmail: string): Observable<ClientDocument> {
    const params = new HttpParams()
    .set('authEmail', authEmail)
    return this.http.put<ClientDocument>(`${this.apiUrl}/${idDOc}/archive`, null,{params});
  }

  unarchiveDoc(idDOc: number): Observable<ClientDocument> {
    return this.http.put<ClientDocument>(`${this.apiUrl}/${idDOc}/unarchive`, {});
  }

  private apiUrl1 = 'http://localhost:8082/api/paiements';

  // 1. Créer un paiement
  createPaiement(clientId: number, montant: number, nombreTranches: number,authEmail:string): Observable<Payement> {
    const body = {
      clientId: clientId,
      montant: montant,
      nombreTranches: nombreTranches
    };
    const params = new HttpParams()
    .set('authEmail', authEmail)
    return this.http.post<Payement>(`${this.apiUrl1}/ajouterPayment`, body,{params});
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
  payerTranche(trancheId: number, authEmail: string): Observable<void> {
    const params = new HttpParams().set('authEmail', authEmail);
    return this.http.post<void>(`${this.apiUrl1}/Tranches/${trancheId}/payer`, null, { params });
  }
  

  getResteAPayer(paiementId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl1}/${paiementId}/reste`);
  }

  updateTrancheAndRedistribute(idTranche: number, montant: number, userEmail: string): Observable<any> {
    const url = `${this.apiUrl1}/tranche/update-montant/${idTranche}`;
    
    const params = new HttpParams()
      .set('montant', montant.toString())
      .set('userEmail', userEmail);

    return this.http.put(url, null, { params: params });
  }

  // clients.service.ts

addTrancheToPayement(idPayement: number, tranche: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl1}/${idPayement}/add-tranche-manual`, tranche);
}

  private apiUrl2 = 'http://localhost:8082/api/Credential';

  // 🔹 Get all credentials
  getAllCredentials(): Observable<Credential[]> {
    return this.http.get<Credential[]>(`${this.apiUrl2}/GetAllCredentials`);
  }

  // 🔹 Get a credential by ID
  getCredentialById(credentialId: number): Observable<Credential> {
    return this.http.get<Credential>(`${this.apiUrl2}/${credentialId}`);
  }

  // 🔹 Get credential by client ID
  getCredentialByClientId(clientId: number): Observable<Credential> {
    return this.http.get<Credential>(`${this.apiUrl2}/Clients/${clientId}`);
  }

  // 🔹 Create a new credential
  createCredential(clientId: number, credential: Credential,authEmail:string): Observable<Credential> {
    const params = new HttpParams()
    .set('authEmail', authEmail)
    return this.http.post<Credential>(`${this.apiUrl2}/createCredential/${clientId}`, credential,{ params: params });
  }

  // 🔹 Update credential
  updateCredential(credentialId: number, credential: Credential,updatedByEmail: string): Observable<Credential> {
    const params = new HttpParams()
    .set('updatedByEmail', updatedByEmail)
    return this.http.put<Credential>(`${this.apiUrl2}/${credentialId}`, credential,{ params: params });
  }

  // 🔹 Delete credential
  deleteCredential(credentialId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl2}/deleteCredential/${credentialId}`);
  }


  private apiUrl3 = 'http://localhost:8082/api/Universite-Credential';

  // 🔹 1. Add UniversiteCredential to Credential
  addUniversiteCredentialToCredential(credentialId: number, data: UniversiteCredential): Observable<UniversiteCredential> {
    return this.http.post<UniversiteCredential>(`${this.apiUrl3}/credential/${credentialId}`, data);
  }

  // 🔹 2. Delete UniversiteCredential by ID
  deleteUniversiteCredential(universiteCredentialId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl3}/deleteUniversiteCredential/${universiteCredentialId}`);
  }

  // 🔹 3. Get UniversiteCredential by ID
  getUniversiteCredentialById(id: number): Observable<UniversiteCredential> {
    return this.http.get<UniversiteCredential>(`${this.apiUrl3}/getUniversiteCredentialById/${id}`);
  }

  // 🔹 4. Update UniversiteCredential
  updateUniversiteCredential(id: number, data: UniversiteCredential): Observable<UniversiteCredential> {
    return this.http.put<UniversiteCredential>(`${this.apiUrl3}/UpdateUniversiteCredential/${id}`, data);
  }

  // 🔹 5. Get all UniversiteCredentials by Credential ID
  getUniversiteCredentialsByCredentialId(credentialId: number): Observable<UniversiteCredential[]> {
    return this.http.get<UniversiteCredential[]>(`${this.apiUrl3}/credential/${credentialId}`);
  }

  private apiUrl4 = 'http://localhost:8082/api/RDV'; // Adjust if backend port differs

  // Add RDV to a credential
  addRDVToCredential(credentialId: number, rdv: RDV): Observable<RDV> {
    return this.http.post<RDV>(`${this.apiUrl4}/credential/${credentialId}`, rdv);
  }

  // Delete RDV from a credential
  removeRDVFromCredential(rdvId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl4}/deleteRdvCredential/${rdvId}`);
  }

  // Get RDV by ID
  getRDVById(id: number): Observable<RDV> {
    return this.http.get<RDV>(`${this.apiUrl4}/getRDVById/${id}`);
  }

  // Update RDV
  updateRDV(id: number, rdvDetails: RDV): Observable<RDV> {
    return this.http.put<RDV>(`${this.apiUrl4}/updateRDV/${id}`, rdvDetails);
  }

  // Get all RDVs for a credential
  getRDVsByCredentialId(credentialId: number): Observable<RDV[]> {
    return this.http.get<RDV[]>(`${this.apiUrl4}/RDVs/${credentialId}`);
  }
}
