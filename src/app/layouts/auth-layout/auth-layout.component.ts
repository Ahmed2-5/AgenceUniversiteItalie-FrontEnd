import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;
  public isLoading = false;

  private loadingSub!: Subscription;

  constructor(
    private router: Router,
    private loadingService: AuthService // <-- inject it here
  ) {}

  ngOnInit() {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("auth-layout");
    body.classList.add("bg-default");

    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });

    this.loadingSub = this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy() {
    const html = document.documentElement;
    const body = document.body;
    html.classList.remove("auth-layout");
    body.classList.remove("bg-default");

    this.loadingSub?.unsubscribe(); // cleanup
  }
}
