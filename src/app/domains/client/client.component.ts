import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LargeComponent } from './large/large.component';

@Component({
  selector: 'app-client',
  imports: [NzInputModule, LargeComponent],
  template: `
    <div class="m-auto max-w-[1000px] p-6">
      @for (question of [].constructor(20); track $index) {
        <div class="flex flex-col gap-6">
          <div>
            <label for="">Savol</label>
            <input type="text" nz-input />
          </div>

          <div class="flex flex-col gap-4 ">
            @for (answer of ['A', 'B', 'C', 'D']; track $index) {
              <div class="flex gap-2">
                <span> {{ answer }} </span>

                <input type="text" nz-input />
              </div>
            }
          </div>
        </div>
        <hr class="my-4" />
      }

      @defer (on viewport) {
        <app-large />
      } @placeholder {
        <div>Loading ...</div>
      }
    </div>
  `,
  styleUrl: './client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {}
