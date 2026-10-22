
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/dashboard/admin-dashboard/admin-dashboard')
        .then(m => m.AdminDashboard)
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./features/user/dashboard/user-dashboard/user-dashboard')
        .then(m => m.UserDashboard)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
