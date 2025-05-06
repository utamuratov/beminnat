import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegionsService } from './common/regions.service';
import { DITokens } from '../../../../core/utils/di.tokens';
import { BaseService } from '../../../../core/services/base.service';
import { GridComponent } from '../../shared/grid/grid.component';
import { GridService } from '../../shared/grid/common/grid.service';
import {
  Column,
  columnFactory,
  IColumn,
} from '../../shared/grid/common/column.model';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-regions',
  imports: [GridComponent, ReactiveFormsModule, NzFormModule, NzInputModule],
  template: `
    <app-grid
      [title]="'Regions'"
      [columns]="columns"
      [columnTemplate]="columnTemplate"
      [form]="form"
      [formTemplate]="formTemplate"
      (navigated)="navigated($event)"
    ></app-grid>

    <ng-template #columnTemplate let-data let-field="field">
      @let columnData = data[field];
      @switch (field) {
        @case ('name') {
          <a href="">{{ columnData }} - {{ data['code'] }}</a>
        }
        @case ('code') {
          <b>
            {{ columnData }}
          </b>
        }
        @default {
          <span>Nimadir xato</span>
        }
      }
    </ng-template>

    <ng-template #formTemplate>
      <form nz-form nzLayout="vertical" [formGroup]="form">
        <nz-form-item>
          <nz-form-label nzFor="name">Name</nz-form-label>
          <nz-form-control>
            <input nz-input name="name" id="name" formControlName="name" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzFor="code">Code</nz-form-label>
          <nz-form-control>
            <input nz-input name="code" id="code" formControlName="code" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzFor="country">Country</nz-form-label>
          <nz-form-control>
            <input
              nz-input
              name="country"
              id="country"
              formControlName="country"
            />
          </nz-form-control>
        </nz-form-item>
      </form>
    </ng-template>
  `,
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
    columnFactory({
      field: 'id',
      width: '100px',
      nzLeft: true,
    }),
    columnFactory({
      field: 'name',
      type: 'template',
    }),
    columnFactory({
      field: 'code',
      type: 'template',
    }),
    columnFactory({
      field: 'country.name',
      header: 'Country',
      nzRight: true,
    }),
  ];

  private $fb = inject(FormBuilder);
  form = this.$fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    country: ['', Validators.required],
  });

  navigated(event: any) {
    console.log(event);
  }
}
