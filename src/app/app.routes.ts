import { Routes } from '@angular/router';
import {NoAuthComponent} from "./no-auth/no-auth.component";
import {HomeComponent} from "./auth/pages/home/home.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: NoAuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  }
];
