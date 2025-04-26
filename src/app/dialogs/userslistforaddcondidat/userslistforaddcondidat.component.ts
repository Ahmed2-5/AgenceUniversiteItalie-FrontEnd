import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslistforaddcondidat',
  templateUrl: './userslistforaddcondidat.component.html',
  styleUrls: ['./userslistforaddcondidat.component.scss']
})
export class UserslistforaddcondidatComponent implements OnInit {
  searchTunisie: string = '';
  searchItalie: string = '';
  
  listTunisie: Utilisateur[] = [];
  listItalie: Utilisateur[] = [];

  selectedADMINTUNISIE?: Utilisateur;
  selectedADMINITALIE?: Utilisateur;

  constructor(
    private userserv: UserService,
    private dialogRef: MatDialogRef<UserslistforaddcondidatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedADMINTUNISIE: Utilisateur,
      selectedADMINITALIE: Utilisateur
    }
  ) {}

  ngOnInit(): void {
    this.userserv.getUtilisateurByRole_LibelleRole("ADMIN_TUNISIE").subscribe((tab) => {
      this.listTunisie = tab.map(user => ({
        ...user,
        profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${user.profileImageUrl}`
      }));
    });

    this.userserv.getUtilisateurByRole_LibelleRole("ADMIN_ITALIE").subscribe((tab) => {
      this.listItalie = tab.map(user => ({
        ...user,
        profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${user.profileImageUrl}`
      }));
    });

    // Init existing selections
    this.selectedADMINTUNISIE = this.data.selectedADMINTUNISIE;
    this.selectedADMINITALIE = this.data.selectedADMINITALIE;
  }

  filterList(list: Utilisateur[], term: string): Utilisateur[] {
    if (!term.trim()) return list;
    const lower = term.toLowerCase();
    return list.filter(u =>
      u.nom.toLowerCase().startsWith(lower) || u.prenom.toLowerCase().startsWith(lower)
    );
  }

  selectTunisie(user: Utilisateur) {
    if (this.selectedADMINTUNISIE?.idUtilisateur === user.idUtilisateur) {
      this.selectedADMINTUNISIE = undefined; // toggle off
    } else {
      this.selectedADMINTUNISIE = user;
    }
  }
  
  selectItalie(user: Utilisateur) {
    if (this.selectedADMINITALIE?.idUtilisateur === user.idUtilisateur) {
      this.selectedADMINITALIE = undefined; // toggle off
    } else {
      this.selectedADMINITALIE = user;
    }
  }
  

  isSelectedTunisie(user: Utilisateur): boolean {
    return this.selectedADMINTUNISIE?.idUtilisateur === user.idUtilisateur;
  }

  isSelectedItalie(user: Utilisateur): boolean {
    return this.selectedADMINITALIE?.idUtilisateur === user.idUtilisateur;
  }

  closeDialog(): void {
    this.dialogRef.close({
      selectedADMINTUNISIE: this.selectedADMINTUNISIE,
      selectedADMINITALIE: this.selectedADMINITALIE
    });
  }
}
