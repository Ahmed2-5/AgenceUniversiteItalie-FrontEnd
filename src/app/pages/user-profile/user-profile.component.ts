import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private route: Router, private userserv: UserService,private authserv:AuthService) { }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email');

    if (email) {
      this.authserv.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.user = data;
          console.log(data.profileImageUrl)
          if (this.user.profileImageUrl) {
             this.user.profileImageUrl = `http://localhost:8082/api/utilisateurs/uploads/${data.profileImageUrl}`;
          }
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

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    if (!this.user.idUtilisateur) return;

    this.userserv.uploadProfileImage(file, this.user.idUtilisateur).subscribe({
      next: (imageUrl: string) => {
        console.log("Image uploaded successfully:", imageUrl);
        this.user.profileImageUrl = imageUrl; 
        location.reload()
      },
      error: (error) => {
        console.error("Error uploading image:", error);
      }
    });
  }

 
}
