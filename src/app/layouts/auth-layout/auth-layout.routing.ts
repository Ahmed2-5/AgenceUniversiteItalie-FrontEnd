import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'reset-password',       component: ResetPasswordComponent },
    { path: 'forgot-password',       component: ForgotPasswordComponent },

];
