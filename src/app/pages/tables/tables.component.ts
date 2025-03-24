import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  listusr:Utilisateur[]=[]
  user:Utilisateur=new Utilisateur()
  constructor(private userserv:UserService,private router:Router){

  }

  ngOnInit(): void {
    this.loadusers()
  }

  loadusers(){
    this.userserv.getAllUtilisateurs().subscribe(
      (tab)=>(
        this.listusr=tab
      )
    )
  }

  openAddUserDialog(): void {

    this.userserv.openAdduserDialog();
  }

  openUpdateDialog(userID :number): void {

    this.userserv.openUpdateDialog(userID);
  }

}
