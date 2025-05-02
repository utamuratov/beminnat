import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegionsService } from './common/regions.service';
import { DITokens } from '../../../../core/utils/di.tokens';
import { BaseService } from '../../../../core/services/base.service';
import { GridComponent } from '../../shared/grid/grid.component';
import { GridService } from '../../shared/grid/common/grid.service';
import { IColumn } from '../../shared/grid/common/column.model';

@Component({
  selector: 'app-regions',
  imports: [GridComponent],
  template: ` <app-grid [title]="'Regions'" [columns]="columns"></app-grid> `,
  styleUrl: './regions.component.css',
  providers: [
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4200',
    },
    {
      provide: GridService,
      useClass: RegionsService,
    },
    RegionsService,
    BaseService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegionsComponent {
  readonly columns: IColumn[] = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'code',
      header: 'Code',
    },
    {
      field: 'country.name',
      header: 'Country',
    },
  ];
}
