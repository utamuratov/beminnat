import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from './common/category.service';
import { BaseService } from '../../../../core/services/base.service';
import { CategoryResponse } from './common/category.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzTableModule } from 'ng-zorro-antd/table';
import { map, Observable } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslocoPipe } from '@jsverse/transloco';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { markAsDirty } from '../../../../core/utils/util';
import { GridComponent } from '../../shared/grid/grid.component';
import { GridService } from '../../shared/grid/common/grid.service';
import { IColumn } from '../../shared/grid/common/column.model';
import { debounceTime } from '../../../../shared/decorators/debounce-time.decorator';
import { DebounceTimeDirective } from '../../../../shared/directives/debounce-time.directive';

@Component({
  selector: 'app-category',
  imports: [
    GridComponent,
    // NzTableModule,
    // NzButtonModule,
    // NzModalModule,
    // TranslocoPipe,
    // ReactiveFormsModule,
    // NzFormModule,
    // NzInputModule,
    // NzPopconfirmModule,

    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    DebounceTimeDirective,
  ],
  providers: [
    CategoryService,
    {
      provide: GridService,
      useClass: CategoryService,
    },
  ],
  template: `
    <app-grid
      [title]="'Categories'"
      [columns]="columns"
      [form]="form"
      [formTemplate]="formTemplate"
    >
      <div titleRight>
        <input
          title="Title"
          nz-input
          debounceTime
          placeholder="search..."
          (search)="search($event)"
        />
      </div>
    </app-grid>

    <ng-template #formTemplate>
      <form nz-form nzLayout="vertical" [formGroup]="form">
        <nz-form-item>
          <nz-form-label nzFor="name">Name</nz-form-label>
          <nz-form-control>
            <input nz-input name="name" id="name" formControlName="name" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzFor="description">Description</nz-form-label>
          <nz-form-control>
            <input
              nz-input
              name="description"
              id="description"
              formControlName="description"
            />
          </nz-form-control>
        </nz-form-item>
      </form>
    </ng-template>
  `,
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent {
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
      field: 'description',
      header: 'Description',
    },
    {
      field: 'createdDate',
      header: 'Created Date',
      type: 'date',
    },
    {
      field: 'photo',
      header: 'Photo',
      type: 'image',
    },
  ];

  private $fb = inject(FormBuilder);
  form = this.$fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  // @debounceTime(1000)
  search(e: any) {
    console.log('', e);
    this.load();
  }

  // FETCH DATA FROM SERVER
  load() {
    console.log('load data');
  }
}
