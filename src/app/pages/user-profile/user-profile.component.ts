import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: Utilisateur = new Utilisateur();

  constructor(private route: Router, private userserv: UserService,private authserv:AuthService) { }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email');

    if (email) {
      this.authserv.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.error("Error fetching user:", error);
        }
      });
    }
  }

  update(): void {
    if (!this.user.idUtilisateur) {
      return;
    }

    this.userserv.updateProfileByIdu(this.user.idUtilisateur, this.user).subscribe({
      next: () => {
        
      },
      error: (error) => {
        console.error("Error updating user:", error);
      }
    });
  }
}
