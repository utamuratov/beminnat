import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export default [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'category',
        loadComponent: () => import('./domains/category/category.component'),
      },
    ],
  },
] as Routes;
