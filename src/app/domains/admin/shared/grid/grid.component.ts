import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
import { DatePipe, NgTemplateOutlet } from '@angular/common';
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
    NgTemplateOutlet,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  title = input.required<string>();
  columns = input.required<IColumn[]>();
  columnTemplate = input<TemplateRef<any>>();
  formTemplate = input.required<TemplateRef<any>>();
  form = input.required<UntypedFormGroup>();

  private $data = inject(GridService);
  data = signal<any[]>([]);

  isVisible = false;

  editingDataId: number = -1;
  get isEditing() {
    return this.editingDataId > 0;
  }

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
    if (this.form().invalid) {
      markAsDirty(this.form());
      return;
    }

    const data = this.form().value;
    if (this.isEditing) {
      this.update(data);
      return;
    }

    this.create(data);
  }

  handleEdit(item: any) {
    this.editingDataId = item.id;
    this.form().patchValue(item);
    this.openModal();
  }

  closeModal() {
    this.isVisible = false;
    this.editingDataId = -1;
    this.form().reset();
  }

  openModal() {
    this.isVisible = true;
  }

  private create(data: any) {
    this.$data.create(data).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return [...prev, res];
        });
        this.closeModal();
      }
    });
  }

  private update(data: any) {
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
