import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({
  selector: '[debounceTime]',
})
export class DebounceTimeDirective implements AfterViewInit {
  @Output()
  search = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(debounceTime(1000))
      .subscribe((w: any) => {
        this.search.emit(w.target.value);
      });
  }
}
