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
    NzPopconfirmModule,
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
              <a (click)="handleEdit(item)">Edit</a>
              |
              <a
                nz-popconfirm
                nzPopconfirmTitle="Are you sure delete this task?"
                nzPopconfirmPlacement="bottom"
                (nzOnConfirm)="delete(item.id)"
                >Delete</a
              >
            </td>
          </tr>
        }
      </tbody>
    </nz-table>

    <nz-modal
      [(nzVisible)]="isVisible"
      [nzTitle]="(isEditing ? 'Edit Category' : 'Create Category') | transloco"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="submit()"
      [nzOkText]="(isEditing ? 'save' : 'create') | transloco"
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
  private $fb = inject(FormBuilder);
  data = signal<CategoryResponse[]>([]);

  isVisible = false;

  editingDataId: number = -1;
  get isEditing() {
    return this.editingDataId > 0;
  }

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
      }
    });
  }

  handleCancel() {
    this.closeModal();
  }

  submit() {
    if (this.form.invalid) {
      markAsDirty(this.form);
      return;
    }

    const data = this.form.value;
    if (this.isEditing) {
      this.update(data);
      return;
    }

    this.create(data);
  }

  handleEdit(item: CategoryResponse) {
    this.editingDataId = item.id;
    this.form.patchValue(item);
    this.openModal();
  }

  closeModal() {
    this.isVisible = false;
    this.editingDataId = -1;
    this.form.reset();
  }

  openModal() {
    this.isVisible = true;
  }

  private create(
    data: Partial<{ name: string | null; description: string | null }>,
  ) {
    this.$data.createCategory(data).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return [...prev, res];
        });
        this.closeModal();
      }
    });
  }

  private update(
    data: Partial<{ name: string | null; description: string | null }>,
  ) {
    this.$data.updateCategory(this.editingDataId, data).subscribe((res) => {
      if (res) {
        const editingData = this.data().find((item) => item.id === res.id);
        if (editingData) {
          editingData.name = res.name;
          editingData.description = res.description;
        }
        this.closeModal();
      }
    });
  }
}
