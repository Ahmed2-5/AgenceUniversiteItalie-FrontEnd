import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UniversityComponent>) {}


  ngOnInit(): void {
  }
  universities = [
    { nomUniversity: 'Université de Tunis', city: 'Tunis', specialization: 'Informatique' },
    { nomUniversity: 'Université de Sfax', city: 'Sfax', specialization: 'Médecine' },
    { nomUniversity: 'Université de Sousse', city: 'Sousse', specialization: 'Économie' }
  ];


  close(): void {
    this.dialogRef.close();
  }

  addUniversity() {
    // Placeholder logic
    alert('Ajouter université (à implémenter)');
  }

}
