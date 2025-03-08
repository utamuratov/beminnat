import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DITokens } from '../../core/utils/di.tokens';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<p>home works!</p>`,
  styleUrl: './home.component.css',
  providers: [
    AuthService,
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4000',
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor($auth: AuthService) {
    $auth.signIn('test', '123456').subscribe(console.log);
  }
}
