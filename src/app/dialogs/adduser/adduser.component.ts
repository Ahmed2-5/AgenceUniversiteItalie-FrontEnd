import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  forminput!: FormGroup;
  submitted: boolean = false; // Track form submission

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userserv: UserService,
    private authserv: AuthService
  ) {}

  ngOnInit(): void {
    this.forminput = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      lname: ["", Validators.required],
      fname: ["", Validators.required],
    });
  }

  onAddClick(): void {
    this.submitted = true; // Set flag to true when button is clicked

    if (!this.forminput.valid) {
      console.log("Form is invalid!");
      return;
    }

    this.Add();
  }

  Add() {
    
    let usr = new Utilisateur()

    usr.adresseMail= this.forminput.controls['email'].value
    this.userserv.getRoleByLibelleRole(this.forminput.controls['role'].value).subscribe((d)=>{
          usr.role=d;
    })
    usr.nom= this.forminput.controls['lname'].value
    usr.prenom= this.forminput.controls['fname'].value 
    usr.motDePasse=this.generatePassword(8)
    this.userserv.createAdmin(
      usr,
      sessionStorage.getItem('email') || '' 
    ).subscribe(
      (response: any) => {
        console.log(response);
        this.closeDialog();
        this.alertWithSuccess();
      },
      (error) => {
        console.log(error);
        
        this.alertWithError("Email is already in use !!!");
      }
    );
    
  }

  closeDialog(): void {
    this.userserv.closeDialog();
  }

  alertWithError(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  alertWithSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'User added successfully!',
      showConfirmButton: false,
      timer: 3000
    });
  }

  generatePassword(length: number = 8): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + specialChars;

    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}
