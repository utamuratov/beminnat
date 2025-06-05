import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InjectorHelper } from './core/injector.helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(injector: Injector) {
    InjectorHelper.injector = injector;
  }
}
