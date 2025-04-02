import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-welcome',
  imports: [NzButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  constructor() {}
}
