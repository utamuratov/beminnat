import { Component, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InjectorHelper } from './core/injector.helper';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private $transloco = inject(TranslocoService);
  constructor(injector: Injector) {
    InjectorHelper.injector = injector;
    this.$transloco.setActiveLang('uz');
  }
}
