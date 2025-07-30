import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-group',
  imports: [NzInputModule, NzIconModule, FormsModule],
  template: `
    <div class="relative">
      <span
        nz-icon
        [nzType]="prefix()"
        nzTheme="outline"
        class="absolute left-2 top-2 z-10"
      ></span>
      <input
        type="text"
        [nzSize]="size()"
        nz-input
        class="pl-6!"
        [(ngModel)]="searchText"
      />
    </div>
  `,
  styleUrl: './input-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent {
  prefix = input.required<string>();
  searchText = model.required<string>();
  size = input<NzSizeLDSType>('large');
}
