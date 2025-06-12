import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  input,
} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  template: `
    <!-- <div class="flex" [class.my-class]="myClass()"> -->
    @for (item of data(); track $index) {
      <div class="border rounded w-20 h-20 p-5">
        <h1>Salom</h1>
      </div>
    }
    <!-- </div> -->
  `,
  host: {
    class: 'flex gap-2',
    '[class]': 'mySecondClass',
    '[attr.data-my-id]': 'mySecondClass',
    '[style.border]': "'1px solid black'",
    '(click)': 'click()',
  },
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  data = input([1, 2, 3]);

  @Input()
  mySecondClass = '';

  // @HostBinding('class') get myClass() {
  //   return `flex gap-2 ${this.mySecondClass}`;
  // }

  click() {
    console.log('Clicked');
  }
}
