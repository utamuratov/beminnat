import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegionsService } from './common/regions.service';
import { HttpClient } from '@angular/common/http';
import { DITokens } from '../../../../core/utils/di.tokens';
import { BaseService } from '../../../../core/services/base.service';

@Component({
  selector: 'app-regions',
  imports: [],
  template: `<p>regions works!</p>`,
  styleUrl: './regions.component.css',
  providers: [
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4200',
    },
    RegionsService,
    BaseService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegionsComponent {
  constructor(private $data: RegionsService) {
    $data.getRegions().subscribe((res) => {});
  }
}
