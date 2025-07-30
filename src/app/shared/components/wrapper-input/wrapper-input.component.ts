import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-wrapper-input',
  imports: [NzIconModule],
  template: `
    <div class="relative">
      <span
        nz-icon
        [nzType]="prefix()"
        nzTheme="outline"
        class="absolute left-2 top-2 z-10"
      ></span>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './wrapper-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperInputComponent {
  prefix = input<string>('search');
}
