import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./landing/landing.routes")
  },
  {
    path: 'products',
    loadChildren: () => import("./products/products.routes")
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.routes")
  },
  {
    path: '**',
    redirectTo: ''
  }
];
