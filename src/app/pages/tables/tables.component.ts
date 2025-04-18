import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  listusr:Utilisateur[]=[]
  user:Utilisateur=new Utilisateur()
  role : string
  constructor(private userserv:UserService,private router:Router){

  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');

    this.loadusers()
  }

  loadusers() {
    this.userserv.getAllUtilisateurs().subscribe(
      (tab) => {
        this.listusr = tab.map(user => ({
          ...user,
          profileImageUrl: `http://localhost:8082/api/utilisateurs/uploads/${user.profileImageUrl}`
        }));
      }
    );
  }
  

  openAddUserDialog(): void {

    this.userserv.openAdduserDialog();
  }

  openUpdateDialog(userID :number): void {

    this.userserv.openUpdateDialog(userID);
  }

  activerUser(user: Utilisateur): void {
    this.userserv.activateAccount(user.adresseMail).subscribe(
      () => {
        this.loadusers();
      },
      (error) => console.log(error)
    );

  }

  desactiverUser(user: Utilisateur): void {
    this.userserv.deactivateAccount(user.adresseMail).subscribe(
      () => {
        this.loadusers();
      },
      (error) => console.log(error)
    );
  }

  confirmActivatedBox(user: Utilisateur) {
    Swal.fire({
      title: 'Are you sure you want to activate this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, activate it',
      cancelButtonText: 'No, keep it inactive'
    }).then((result) => {
      if (result.value) {
        this.activerUser(user); // Activate user
        Swal.fire("Account Activated", "This account has been activated", "success").then(() => {
          location.reload(); // Reload the page after activation
        });
      }
    });
  }
  
  confirmDeactivatedBox(user: Utilisateur) {
    Swal.fire({
      title: 'Are you sure you want to deactivate this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate it',
      cancelButtonText: 'No, keep it active'
    }).then((result) => {
      if (result.value) {
        this.desactiverUser(user); // Deactivate user
        Swal.fire("Account Deactivated", "This account has been deactivated", "success").then(() => {
          location.reload(); // Reload the page after deactivation
        });
      }
    });
  }
  

  

}
