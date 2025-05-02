import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDeepValue',
})
export class DeepValuePipe implements PipeTransform {
  /**
   *
   * @param columnValue
   * @param deepValueField country.name; name
   */
  transform(columnValue: any, deepValueField: string) {
    const splittedField = deepValueField.split('.');
    splittedField.forEach((field) => {
      columnValue = columnValue[field];
    });

    return columnValue;
  }
}
