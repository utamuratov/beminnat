import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client',
  imports: [],
  template: `<p>client works!</p>`,
  styleUrl: './client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent { }
