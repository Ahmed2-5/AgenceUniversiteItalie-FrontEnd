// statistique.service.ts (COMPLETE)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatistiqueService {
  private baseUrl = 'http://localhost:8082/api/statistiques';

  constructor(private http: HttpClient) {}

  getMontantRecuParJour(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/recu/jour`);
  }

  getMontantRecuParSemaine(): Observable<Record<number, number>> {
    return this.http.get<Record<number, number>>(`${this.baseUrl}/recu/semaine`);
  }

  getMontantRecuParMois(): Observable<Record<number, number>> {
    return this.http.get<Record<number, number>>(`${this.baseUrl}/recu/mois`);
  }

  // ---------- Montant attendu ----------
  getMontantAttenduParJour(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/attendu/jour`);
  }

  getMontantAttenduParSemaine(): Observable<Record<number, number>> {
    return this.http.get<Record<number, number>>(`${this.baseUrl}/attendu/semaine`);
  }

  getMontantAttenduParMois(): Observable<Record<number, number>> {
    return this.http.get<Record<number, number>>(`${this.baseUrl}/attendu/mois`);
  }

  // ---------- Comparaison ----------
  getComparaisonParMois(): Observable<Record<number, Record<string, number>>> {
    return this.http.get<Record<number, Record<string, number>>>(`${this.baseUrl}/comparaison/mois`);
  }

  // ---------- Clients & Admins ----------
  getNombreClientsParAdmin(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/clients/admins`);
  }

  getMontantRecuParAdmin(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/recu/admins`);
  }
}
