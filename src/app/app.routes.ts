import { Routes } from '@angular/router';
import { HomePageComponent } from '../app/pages/home/home.component';
import { ReviewDetailPageComponent } from '../app/pages/review-detail/review-detail.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { SignUpComponent } from '../app/pages/signup/signup.component';
import { authGuard } from '../app/guards/auth.guard'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'home', 
    component: HomePageComponent,
    canActivate: [authGuard] // Protegido
  },
  { 
    path: 'review/:id', 
    component: ReviewDetailPageComponent,
    canActivate: [authGuard] // Protegido
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];