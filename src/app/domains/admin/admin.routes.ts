import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VsComponent } from './domains/vs/vs.component';

export default [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'category',
        loadComponent: () => import('./domains/category/category.component'),
      },
      {
        path: 'regions',
        loadComponent: () => import('./domains/regions/regions.component'),
      },
      {
        path: 'district',
        loadComponent: () => import('./domains/district/district.component'),
      },
      {
        path: 'test',
        loadComponent: () => import('./domains/test/test.component'),
      },
      {
        path: 'vs',
        loadChildren: () =>
          import('./domains/vs/vs.module').then((m) => m.VsModule),
      },
      {
        path: 'typed-form',
        loadComponent: () =>
          import('./domains/typed-form/typed-form.component'),
      },
      {
        path: 'signal',
        loadComponent: () => import('./domains/signal/signal.component'),
      },
    ],
  },
] as Routes;
