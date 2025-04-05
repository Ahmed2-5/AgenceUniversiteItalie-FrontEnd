import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showAlert = false;  
  showEmailError = false;  
  showPasswordError = false;  
  forminput!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.forminput = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    if (this.forminput.valid) {
      this.authService.login(this.forminput.controls["email"].value, this.forminput.controls["password"].value).subscribe(
        (authResult) => {
          this.authService.saveUser(authResult.token, authResult.email, authResult.role);

          if (authResult.role === "SUPER_ADMIN" || authResult.role === "ADMIN") {
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          if (error.message === 'User inactive') {
            Swal.fire({
              html: '<i class="fas fa-ban fa-3x" style="color: #af2f64;"></i><br><br><b>Your account is inactive.</b><br>Please contact support for assistance.',
              showConfirmButton: false,
              showCancelButton:true,
              cancelButtonText: 'OK',
            });
          }
          else
            {
              this.showAlert = true;
            }
        }
      );
    } else {
      if (this.forminput.controls['email'].errors) {
        this.showEmailError = true;
        setTimeout(() => {
          this.showEmailError = false;
        }, 3000);
      }
      if (this.forminput.controls['password'].errors) {
        this.showPasswordError = true;
        setTimeout(() => {
          this.showPasswordError = false;
        }, 3000);
      }
    }
  }
}
