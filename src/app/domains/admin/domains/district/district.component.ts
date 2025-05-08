import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GridComponent } from '../../shared/grid/grid.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { columnFactory, IColumn } from '../../shared/grid/common/column.model';
import { DITokens } from '../../../../core/utils/di.tokens';
import { GridService } from '../../shared/grid/common/grid.service';
import { DistrictService } from './common/district.service';
import { BaseService } from '../../../../core/services/base.service';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-district',
  imports: [
    GridComponent,
    ReactiveFormsModule,
    FormlyModule,
    NzButtonModule,
    NzFormModule,
  ],
  template: `
    <app-grid
      [title]="'Districts'"
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
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit(model)"
        nz-form
        nzLayout="vertical"
      >
        <formly-form
          [form]="form"
          [fields]="fields"
          [model]="model"
        ></formly-form>
        <button type="submit" nz-button>Submit</button>
      </form>
    </ng-template>
  `,

  providers: [
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4200',
    },
    {
      provide: GridService,
      useClass: DistrictService,
    },
    DistrictService,
    BaseService,
  ],
  styleUrl: './district.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DistrictComponent {
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
  ];

  // private $fb = inject(FormBuilder);
  // form = this.$fb.group({
  //   name: ['', Validators.required],
  //   code: ['', Validators.required],
  // });

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex gap-4',
      fieldGroup: [
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email address',
            placeholder: 'Enter email',
            required: true,
          },
        },
        {
          key: 'countryId',
          type: 'select',
          props: {
            label: 'Country',
            placeholder: 'Select country',
            options: [
              { label: 'Uzbekistan', value: 1 },
              { label: 'Kazakhstan', value: 2 },
              { label: 'Kyrgyzstan', value: 3 },
            ],
            required: true,
          },
        },
      ],
    },
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}
