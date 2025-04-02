import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'client',
    loadComponent: () =>
      import('./domains/client/client.component').then(
        (m) => m.ClientComponent,
      ),
  },
  {
    path: 'admin',
    loadChildren: () => import('./domains/admin/admin.routes'),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./domains/auth/sign-in/sign-in.component'),
  },
];
