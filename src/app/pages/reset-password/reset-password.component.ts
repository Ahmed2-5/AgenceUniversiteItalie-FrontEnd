import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  showPasswordRequirements: boolean = false;
  forminput!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  token!: string;
  submitted: boolean = false; 

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private authserv: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/error']);
      }
    });

    this.forminput = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%^*()_+])[A-Za-z\d@$!%^*()_+]{12,}$/)
        ]
      ],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: (control: AbstractControl) => {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
      }
    });
  }

  reset() {
    this.submitted = true;
    if (this.forminput.valid) {
      this.authserv.resetPassword(
        this.token, 
        this.forminput.controls["password"].value, 
        this.forminput.controls["confirmPassword"].value
      ).subscribe(
        () => {
          this.alertWithSuccess();
          this.router.navigate(["/login"]);  // ✅ Fixed Navigation
        },
        (error) => {
          this.alertWithWarning("Error: " + error.message);
        }
      );
    }
  }

  alertWithSuccess() {
    Swal.fire({
      icon: "success",
      title: "Mot de passe modifié avec succès",
      showConfirmButton: true
    });
  }

  alertWithWarning(message: string) {
    Swal.fire({
      icon: "warning",
      title: "Attention!",
      text: message,
      showConfirmButton: true
    });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }
}
