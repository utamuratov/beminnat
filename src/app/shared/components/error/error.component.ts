import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlEvent,
  TouchedChangeEvent,
} from '@angular/forms';

@Component({
  selector: 'error',
  imports: [],
  template: `
    @if ((control.touched || control.dirty) && control.errors) {
      @if (control.hasError('required')) {
        <p class="error">{{ 'Required' }}</p>
      }

      @if (control.hasError('minlength')) {
        <p class="error">
          {{ 'Min length: ' }}
          {{ control.errors['minlength']['requiredLength'] }}
        </p>
      }

      @if (control.hasError('maxlength')) {
        <p class="error">
          {{ 'Min length: ' }}
          {{ control.errors['maxlength']['requiredLength'] }}
        </p>
      }
    }
  `,
  styleUrl: './error.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input({ required: true }) control!: AbstractControl;

  // constructor(private $cdr: ChangeDetectorRef) {}

  // ngOnInit(): void {
  //   this.control.events.subscribe((event: ControlEvent) => {
  //     if (event instanceof TouchedChangeEvent) {
  //       if (event.touched) {
  //         this.$cdr.markForCheck();
  //         // Do stuff
  //       } else {
  //         // Do other stuff...
  //       }
  //     }
  //   });
  //   this.control.valueChanges.subscribe(() => {
  //     this.$cdr.markForCheck();
  //   });
  // }
}
