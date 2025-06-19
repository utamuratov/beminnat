import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vs-child',
  imports: [],
  template: `<p>{{ name }}</p>
    <h2>{{ NAME() }}</h2>
    <h2>{{ a() }}</h2>
    @if (data) {
      <p>{{ data.firstName }}</p>
      <p>{{ data.firstName }}</p>
      <p>{{ data.firstName }}</p>
      <p>{{ data.firstName }}</p>
      <p>{{ data.firstName }}</p>
      <p>{{ data.firstName }}</p>
    } @else {
      <p>Kechirasiz malumot olib kelishda xatolik</p>
    }`,
  styleUrl: './vs-child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VsChildComponent {
  @Input() short = false;

  @Input({ required: true, alias: 'fullName', transform: treatName })
  name!: string;

  NAME = input.required<string>();

  a = computed(() =>
    this.short
      ? `${this.NAME()[0]}. ${this.NAME().split(' ')[1]}`
      : this.NAME(),
  );

  // private _name!: string;
  // public get name(): string {
  //   return this._name;
  // }
  // @Input({ required: true, alias: 'fullName' })
  // public set name(v: string) {
  //   this._name = this.short ? `${v[0]}. ${v.split(' ')[1]}` : v;
  // }

  data: {
    firstName: string;
  } | null = null as any;
}

function treatName(name: string) {
  name = name.trim();
  return `${name[0]}. ${name.split(' ')[1]}`;
}
