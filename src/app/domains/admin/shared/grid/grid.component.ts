import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { markAsDirty } from '../../../../core/utils/util';
import { GridService } from './common/grid.service';
import { IColumn } from './common/column.model';
import { DatePipe } from '@angular/common';
import { DeepValuePipe } from './common/deep-value.pipe';

@Component({
  selector: 'app-grid',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    TranslocoPipe,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
    DatePipe,
    DeepValuePipe,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  title = input.required<string>();
  columns = input.required<IColumn[]>();

  private $data = inject(GridService);
  private $fb = inject(FormBuilder);
  data = signal<any[]>([]);

  isVisible = false;

  editingDataId: number = -1;
  get isEditing() {
    return this.editingDataId > 0;
  }

  form = this.$fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.$data.getAll().subscribe((res) => {
      this.data.set(res);
    });
  }

  delete(id: number) {
    this.$data.delete(id).subscribe((res) => {
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

  handleEdit(item: any) {
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
    this.$data.create(data).subscribe((res) => {
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
    this.$data.update(this.editingDataId, data).subscribe((res) => {
      if (res) {
        const editingData = this.data().find((item) => item.id === res.id);
        if (editingData) {
          editingData.name = res.name;
          editingData.code = res.code;
        }
        this.closeModal();
      }
    });
  }
}
