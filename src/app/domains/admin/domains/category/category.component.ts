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
  ],
  providers: [
    CategoryService,
    {
      provide: GridService,
      useClass: CategoryService,
    },
  ],
  template: `
    <app-grid [title]="'Categories'" [columns]="columns"></app-grid>
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
}
