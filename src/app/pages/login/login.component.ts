import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';


  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
