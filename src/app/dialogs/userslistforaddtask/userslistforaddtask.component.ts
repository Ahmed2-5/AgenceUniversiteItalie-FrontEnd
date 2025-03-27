import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslistforaddtask',
  templateUrl: './userslistforaddtask.component.html',
  styleUrls: ['./userslistforaddtask.component.scss']
})
export class UserslistforaddtaskComponent implements OnInit {

  searchTerm: string = '';
  listusr: Utilisateur[] = [];

  constructor(private userserv: UserService,
              private dialogRef: MatDialogRef<UserslistforaddtaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { selectedSetUsers : Set<Utilisateur> }
  ) {}

  ngOnInit(): void {
    this.userserv.getUtilisateurByRole_LibelleRole("ADMIN").subscribe(
      (tab) => {
        this.listusr = tab.map(user => ({
          ...user,
          profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${user.profileImageUrl}`
        }));
      }
    );
  }

  filterTasks() {
    if (!this.searchTerm.trim()) {
      return this.listusr;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.listusr.filter(usr =>
      usr.nom.toLowerCase().startsWith(searchTermLower) || 
      usr.prenom.toLowerCase().startsWith(searchTermLower)
    );
  }

  toggleSelection(user: Utilisateur) {
    if (this.isSelected(user)) {
      this.data.selectedSetUsers.delete(user);
    } else {
      this.data.selectedSetUsers.add(user);
    }
  }
  
  isSelected(user: Utilisateur): boolean {
    return Array.from(this.data.selectedSetUsers).some(u => u.idUtilisateur === user.idUtilisateur);
  }
  
  closeDialog(): void {
    this.dialogRef.close(this.data.selectedSetUsers);
  }
  
}