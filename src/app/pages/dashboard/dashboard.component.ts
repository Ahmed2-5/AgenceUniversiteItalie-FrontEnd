// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recuJour = new Map<string, number>();
  recuSemaine = new Map<string, number>();
  recuMois = new Map<string, number>();
  attenduJour = new Map<string, number>();
  attenduSemaine = new Map<string, number>();
  attenduMois = new Map<string, number>();
  comparaisonMois: Record<string, Record<string, number>> = {};
  clientsAdmin = new Map<string, number>();
  recuAdmin = new Map<string, number>();

  totalRecu: number = 0;
  totalAttendu: number = 0;
  pourcentageRecu: number = 0;

  constructor(private stats: StatistiqueService) {}

  ngOnInit(): void {
    this.loadAllStats();
  }

  loadAllStats(): void {
    this.stats.getMontantRecuParJour().subscribe(data => this.recuJour = new Map(Object.entries(data)));
    console.log(this.recuJour)
    this.stats.getMontantRecuParSemaine().subscribe(data => this.recuSemaine = new Map(Object.entries(data)));
    this.stats.getMontantRecuParMois().subscribe(data => this.recuMois = new Map(Object.entries(data)));

    this.stats.getMontantAttenduParJour().subscribe(data => this.attenduJour = new Map(Object.entries(data)));
    this.stats.getMontantAttenduParSemaine().subscribe(data => this.attenduSemaine = new Map(Object.entries(data)));
    this.stats.getMontantAttenduParMois().subscribe(data => this.attenduMois = new Map(Object.entries(data)));

    this.stats.getNombreClientsParAdmin().subscribe(data => this.clientsAdmin = new Map(Object.entries(data)));
    this.stats.getMontantRecuParAdmin().subscribe(data => this.recuAdmin = new Map(Object.entries(data)));

    this.stats.getComparaisonParMois().subscribe(data => {
      this.comparaisonMois = data;
      this.totalRecu = 0;
      this.totalAttendu = 0;

      Object.values(data).forEach(mois => {
        this.totalRecu += mois.recu;
        this.totalAttendu += mois.attendu;
      });

      this.pourcentageRecu = this.totalAttendu > 0
        ? (this.totalRecu / this.totalAttendu) * 100
        : 0;
    });
  }
}
