import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  showAlert: boolean = false;
  showErrorAlert: boolean = false;
  showEmailError: boolean = false;  
  submitted: boolean = false; 

  forminput: FormGroup;

  constructor(
    private route: Router, 
    private authserv: AuthService,
    private fb: FormBuilder
  ) { 
    this.forminput = this.fb.group({
      email: ['', [Validators.required, Validators.email]] 
    });
  }

  ngOnInit(): void { }

  reset() {
    this.submitted = true;
    this.showEmailError = false;
    this.showErrorAlert = false;

    if (this.forminput.invalid) {
      this.showEmailError = true; // Show error if the email is invalid
      return;
    }

    const email = this.forminput.get('email')?.value;

    this.forgotPassword(email).subscribe({
      next: () => {
        // If the email was sent successfully
        this.showAlert = true;
        setTimeout(() => {
          this.route.navigate(["/login"]);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.showErrorAlert = true;  // Show error alert if there's an issue
      }
    });
  }

  forgotPassword(email: string) {
    return this.authserv.forgotPassword(email);  // Service call to reset password
  }

  closeAlert(): void {
    this.showAlert = false;  
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;  
  }
}
