import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNamesBySearchText',
})
export class FilterNamesPipe implements PipeTransform {
  transform(names: string[], searchText: string): string[] {
    return names.filter((name) =>
      name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
}
