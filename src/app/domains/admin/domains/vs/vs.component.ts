import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vs',
  standalone: false,
  // imports: [],
  template: `<p>vs works!</p>

    <button nz-button>I am button</button>
    <app-button>Salom</app-button>

    {{ name }}

    <hr />

    <app-vs-child
      [short]="true"
      [fullName]="'   Falonchiyev Falonchi   '"
      [NAME]="nimadir"
    /> `,
  styleUrl: './vs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VsComponent {
  private _name: string = 'Salom';
  public get name(): string {
    return this._name;
  }
  private set name(v: string) {
    this._name = v;
  }

  private route = inject(ActivatedRoute);

  nimadir = 'Falonchiyev Falonchi'; // signal('Salom');

  constructor(private http: HttpClient) {}
}
