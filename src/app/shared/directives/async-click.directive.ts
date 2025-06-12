import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';

@Directive({
  selector: '[asyncClick]',
  host: {
    '(click)': 'click()',
  },
})
export class AsyncClickDirective {
  @Input()
  asyncClick!: Function;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private nzButton: NzButtonComponent,
    private cdr: ChangeDetectorRef,
  ) {}

  // @HostListener('click') click() {
  click() {
    console.log('click');
    if (typeof this.asyncClick === 'function') {
      this.subscribe(this.asyncClick());
    }

    // Call function
  }

  subscribe(obs$: Observable<any>) {
    if (typeof obs$.subscribe === 'function') {
      this.disable();
      obs$.subscribe({
        next: () => {},
        complete: () => {
          this.enable();
        },
        error: () => {
          this.enable();
        },
      });
    }
  }

  disable() {
    this.nzButton.nzLoading = true;
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      'true',
    );
  }

  enable() {
    this.nzButton.nzLoading = false;
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    this.cdr.markForCheck();
  }
}
