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
import { IFormField } from '../../shared/dynamic-form/common/form-field.model';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-regions',
  imports: [GridComponent, DynamicFormComponent],
  template: `
    <app-grid
      [title]="'Regions'"
      [columns]="columns"
      [columnTemplate]="columnTemplate"
      [form]="form"
      [formTemplate]="formTemplate"
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
      <app-dynamic-form [form]="form" [fields]="fields"></app-dynamic-form>
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
    countryId: ['', Validators.required],
  });

  fields: IFormField[] = [
    {
      fieldsGroup: {
        class: 'flex gap-4',
        fields: [
          {
            field: 'name',
            label: 'Name',
            type: 'input',
            class: 'w-1/2',
          },
          {
            field: 'code',
            label: 'Code',
            type: 'input',
            class: 'w-full',
          },
        ],
      },
    },
    {
      field: 'countryId',
      label: 'Country',
      type: 'select',
      options: [
        {
          label: 'Uzbekistan',
          value: 'uz',
        },
        {
          label: 'Kazakhstan',
          value: 'kz',
        },
        {
          label: 'Kyrgyzstan',
          value: 'kg',
        },
      ],
    },
  ];

  navigated(event: any) {
    console.log(event);
  }
}
