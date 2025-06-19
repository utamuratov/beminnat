import { NgModule } from '@angular/core';
import { VsComponent } from './vs.component';
import { RouterModule } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { VsRoutingModule } from './vs.routing';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { VsChildComponent } from './vs-child/vs-child.component';

@NgModule({
  declarations: [VsComponent],
  imports: [
    NzButtonComponent,
    VsRoutingModule,
    ButtonComponent,
    VsChildComponent,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: VsComponent,
    //   },
    // ]),
  ],
  exports: [],
})
export class VsModule {}
