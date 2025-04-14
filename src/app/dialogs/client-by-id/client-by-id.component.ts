import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Utilisateur } from '../../models/Utilisateur.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PayementByClientComponent } from '../payement-by-client/payement-by-client.component';

@Component({
  selector: 'app-client-by-id',
  templateUrl: './client-by-id.component.html',
  styleUrls: ['./client-by-id.component.scss']
})
export class ClientByIdComponent implements OnInit {

  documents = [
      { name: 'Passport Ahmed', isEmpty: false },
      { name: 'Diploma Ahmed', isEmpty: false },
      { name: 'Document 1', isEmpty: true },
      { name: 'Document 2', isEmpty: false },
      { name: 'Document 3', isEmpty: true }
    ];
   user: Utilisateur = new Utilisateur();
    @ViewChild('fileInput') fileInput!: ElementRef;
  
    constructor(
      private route: Router,
      private userserv: UserService,
      private authserv:AuthService,
      private dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
      /*const email = sessionStorage.getItem('email');
  
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
      }*/
    }
  
  /*  update(): void {
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
    }*/
  
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
  
    openPaymenetDialog(clientID: number) {
        const dialogRef = this.dialog.open(PayementByClientComponent, {
          data: { clientID: clientID },
          disableClose: true, // This ensures the dialog closes when clicking outside
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Dialog closed with result:', result);
          }
        });
      }
   
  }
  