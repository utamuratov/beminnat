import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  {
    path: 'client',
    loadComponent: () =>
      import('./domains/client/client.component').then(
        (m) => m.ClientComponent,
      ),
  },
  {
    path: 'wrappers',
    loadComponent: () => import('./domains/client/wrappers/wrappers.component'),
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./domains/client/rxjs/rxjs.component'),
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
