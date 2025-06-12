import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'button[my-button]',
  imports: [],
  template: ` <ng-content /> `,
  styleUrl: './my-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyButtonComponent {}
