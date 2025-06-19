import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VsComponent } from './vs.component';

const routes: Routes = [
  {
    path: '',
    component: VsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VsRoutingModule {}
