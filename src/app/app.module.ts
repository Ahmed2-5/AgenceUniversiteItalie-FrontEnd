import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ComponentsModule } from './components/components.module';

<<<<<<< HEAD
import { MatDialogModule } from '@angular/material/dialog';
=======
import { MatDialogModule } from '@angular/material/dialog'; // Ensure this is imported
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
<<<<<<< HEAD
    AuthLayoutComponent
        ],
=======
    AuthLayoutComponent,
  ],
>>>>>>> 135e5dce99dd08a31355f1be752cf88c1d5af37f
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
