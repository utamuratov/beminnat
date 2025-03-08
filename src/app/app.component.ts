import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { AuthUtils } from './core/utils/auth.utils';
import { HttpClient } from '@angular/common/http';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslocoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beminnat';

  isAuthorized = false;
  user?: any;
  data = [1, 2, 3, 4, 5];

  constructor(
    private $auth: AuthService,
    private http: HttpClient,
  ) {
    console.log(environment.production);
    $auth.signIn('test@gmail.com', '123456').subscribe((w) => {
      console.log(w);
      $auth.accessToken = 'test';

      if (AuthUtils.isTokenExpired($auth.accessToken)) {
        console.log('Token is expired');
      } else {
        console.log('Token is not expired');
      }
    });

    http
      .post<{ access_token: string; refresh_token: string }>(
        'https://api.escuelajs.co/api/v1/auth/login',
        {
          email: 'john@mail.com',
          password: 'changeme',
        },
      )
      .subscribe((w) => {
        if (w.access_token) {
          $auth.accessToken = w.access_token;
          if (AuthUtils.isTokenExpired($auth.accessToken)) {
            console.log('Token is expired');
          } else {
            console.log('Token is not expired');
          }
        }
      });
  }
}
