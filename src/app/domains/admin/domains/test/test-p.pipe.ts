import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTestP',
})
export class TestPPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('testP', value);

    return value;
  }
}
