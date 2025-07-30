import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';
import { WrapperInputComponent } from '../../../shared/components/wrapper-input/wrapper-input.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-wrappers',
  imports: [InputGroupComponent, WrapperInputComponent, NzInputModule],
  template: `
    <h1>Wrappers</h1>
    <app-input-group
      [prefix]="'search'"
      [(searchText)]="searchText"
      [size]="'small'"
    />

    <app-wrapper-input>
      <input type="text" [nzSize]="'small'" nz-input class="pl-6!" />
    </app-wrapper-input>
  `,
  styleUrl: './wrappers.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WrappersComponent {
  searchText = 'Test';
}
