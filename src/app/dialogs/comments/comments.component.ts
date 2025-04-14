import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Commentaire } from 'src/app/models/Commentaire.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: Commentaire[] = [];
  forminput!: FormGroup;
  user:Utilisateur=new Utilisateur()
  commentDates: Set<Date> = new Set<Date>();

  constructor(
    private fb: FormBuilder,
    private userserv: UserService,
    private authserv: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { taskID: number },
    private dialogRef: MatDialogRef<CommentsComponent>, 
    private commentserv: CommentaireService
  ) {}

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

    this.forminput = this.fb.group({
      commenttext: ["", Validators.required],
    });
    this.loadComments();
  }

  loadComments(): void {
    this.commentserv.getCommentsByTache(this.data.taskID).subscribe((comments) => {
      this.comments = comments.map(comment => ({
        ...comment,
        utilisateur: {
          ...comment.utilisateur,  // Keep other user properties
          profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${comment.utilisateur.profileImageUrl}`
        }
      }));
      this.commentDates = new Set<Date>(comments.map(comment => new Date(comment.dateCreationCommentaire)));
    });
  }
  

  getCommentDate(index: number): Date {
    const commentArray = Array.from(this.commentDates);
    return commentArray[index];
  }

  getTimeDifference(idcomment: number): string {
    const currentDate = new Date();
    const commentDate = this.getCommentDate(idcomment);
  
    // Round the time difference to the nearest integer
    let timeDifference = Math.round(Math.abs(currentDate.getTime() - commentDate.getTime()) / 1000);
  
    const years = Math.floor(timeDifference / (3600 * 24 * 365.25));
    if (years > 0) {
      return `${years}y`;
    }
    timeDifference -= years * 3600 * 24 * 365.25;
  
    const months = Math.floor(timeDifference / (3600 * 24 * 30.44));
    if (months > 0) {
      return `${months}mo`;
    }
    timeDifference -= months * 3600 * 24 * 30.44;
  
    const days = Math.floor(timeDifference / (3600 * 24));
    if (days > 0) {
      return `${days}d`;
    }
    timeDifference -= days * 3600 * 24;
  
    const hours = Math.floor(timeDifference / 3600);
    if (hours > 0) {
      return `${hours}h`;
    }
    timeDifference -= hours * 3600;
  
    const minutes = Math.floor(timeDifference / 60);
    if (minutes > 0) {
      return `${minutes}min`;
    }
  
    const seconds = Math.floor(timeDifference % 60);
    return `${seconds}s`;
  }
  

  sendComment(): void {
    const contenu = this.forminput.controls['commenttext'].value;

    this.commentserv.addComment(this.data.taskID,contenu, this.user.adresseMail).subscribe((d) => {
      this.loadComments(); 
      this.forminput.reset(); 
      console.log(d);
    },
    (error) => {
      console.error(error);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteComment(commentId: number) {
      this.commentserv.deleteComment(commentId,this.user.adresseMail).subscribe(
        () => {
          this.loadComments()
        },
        (error) => {
          this.loadComments()
          console.error("Error deleting comment:", error);
        }
      );
    
  }
  
}
