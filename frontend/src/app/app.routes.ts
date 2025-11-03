import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

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
    loadChildren: () => import("./auth/auth.routes"),
    canMatch: [
      NotAuthenticatedGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
