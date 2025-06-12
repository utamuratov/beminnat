import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'a[href]',
  template: `<ng-content />`,
  host: {
    target: '_blank',
  },
})
export class ExternalLinkComponent {}
