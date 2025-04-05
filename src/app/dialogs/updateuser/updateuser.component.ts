import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {

  id!:number;
  user!:Utilisateur;
  showUpdateAlert = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: number },private userserv:UserService,private route:ActivatedRoute,private router:Router){}
  
  ngOnInit(): void {
    this.user=new Utilisateur;
    this.id = this.data.userId; 

    this.userserv.getUserById(this.id).subscribe(data => {
       this.user = data;
  }, error => console.log(error));
  }
 
  onSubmit(){
   this.userserv.updateUserById(this.id,this.user).subscribe(data=>{
    this.goToUserList();
 }, error => console.log(error));
  }

  onUpdateClick() {
    if (!this.user.nom || !this.user.prenom) {
      this.showUpdateAlert = true;
    }
  
    if (!this.showUpdateAlert) {
      this.onSubmit();
    }else{
      this.showUpdateAlert = false;
    }
  }
  
  goToUserList() {
    if (!this.showUpdateAlert) {
      this.closeDialog();
      this.alertWithSuccess();
      this.showUpdateAlert = false;
    }
  }

  closeDialog(): void {
    this.userserv.closeDialog();
  }

  alertWithSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Account updated Successfully',
      showConfirmButton: true,
      preConfirm: () => {
        location.reload();
      },
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
