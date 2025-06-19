import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  imports: [NzButtonComponent, TranslocoModule],
  standalone: true,
  template: `<button nz-button><ng-content></ng-content></button>`,
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
