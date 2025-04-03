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

@Component({
  selector: 'app-category',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    TranslocoPipe,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ],
  providers: [CategoryService],
  template: `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Categories</h2>
      <button nz-button (click)="openModal()">Create</button>
    </div>

    <nz-table #basicTable [nzData]="data()">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th [nzWidth]="'150px'">Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (item of basicTable.data; track item) {
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <a>Edit</a>
              |
              <a (click)="delete(item.id)">Delete</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>

    <nz-modal
      [(nzVisible)]="isVisible"
      nzTitle="Create"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzOkText]="'save' | transloco"
    >
      <ng-container *nzModalContent>
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
              <textarea
                nz-input
                placeholder="Controlled autosize"
                [nzAutosize]="{ minRows: 3, maxRows: 5 }"
                name="description"
                id="description"
                formControlName="description"
              ></textarea>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent implements OnInit {
  private $data = inject(CategoryService);
  private $cdr = inject(ChangeDetectorRef);
  private $fb = inject(FormBuilder);
  // data$!: Observable<CategoryResponse[]>;
  data = signal<CategoryResponse[]>([]);

  isVisible = false;

  form = this.$fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    // this.data$ = this.$data.getCategories();
    this.$data.getCategories().subscribe((res) => {
      this.data.set(res);
    });
  }

  delete(id: number) {
    this.$data.deleteCategory(id).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return prev.filter((item) => item.id !== id);
        });
        // this.data$ = this.data$.pipe(
        //   map((data) => {
        //     return data.filter((item) => item.id !== id);
        //   }),
        // );
        // this.$cdr.markForCheck();
      }
    });
  }

  create() {
    //
  }

  handleCancel() {
    this.closeModal();
  }

  handleOk() {
    if (this.form.invalid) {
      Object.entries(this.form.controls).forEach(([key, control]) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    const data = this.form.value;
    this.$data.createCategory(data).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return [...prev, res];
        });
        this.form.reset();
      }
    });

    this.closeModal();
  }

  closeModal() {
    this.isVisible = false;
  }

  openModal() {
    this.isVisible = true;
  }
}
