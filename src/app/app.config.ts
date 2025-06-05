import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DITokens } from './core/utils/di.tokens';
import { environment } from '../environments/environment';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: DITokens.API_ENDPOINT,
      useValue: environment.endpoint,
    },
    provideTransloco({
      config: {
        availableLangs: ['en', 'uz', 'ru'],
        defaultLang: 'uz',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideNzIcons(icons),
    provideNzI18n(ru_RU),
    importProvidersFrom([FormlyModule.forRoot(), FormlyNgZorroAntdModule]),
    provideAnimationsAsync(),

    NzModalService,
    // provideHttpClient(),
  ],
};
