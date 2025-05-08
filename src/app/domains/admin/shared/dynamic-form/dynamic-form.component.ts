import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IFormField } from './common/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule],
  template: `
    <form nz-form nzLayout="vertical" [formGroup]="form()" [class]="class()">
      @for (formField of fields(); track formField.field) {
        @if (formField.fieldsGroup) {
          <app-dynamic-form
            [form]="form()"
            [fields]="formField.fieldsGroup.fields"
            [class]="formField.fieldsGroup.class"
          />
        } @else {
          @let field = formField.field;
          @let type = formField.type;
          <div [class]="formField.class">
            @switch (type) {
              @case ('input') {
                <nz-form-item>
                  <nz-form-label [nzFor]="field">{{
                    formField.label
                  }}</nz-form-label>
                  <nz-form-control>
                    <input
                      nz-input
                      [name]="field"
                      [id]="field"
                      [formControlName]="field!"
                    />
                  </nz-form-control>
                </nz-form-item>
              }
              @case ('select') {
                <nz-form-item>
                  <nz-form-label [nzFor]="field">{{
                    formField.label
                  }}</nz-form-label>
                  <nz-form-control>
                    <nz-select [id]="field" [formControlName]="field!">
                      @for (option of formField.options; track option.value) {
                        <nz-option
                          [nzValue]="option.value"
                          [nzLabel]="option.label"
                        ></nz-option>
                      }
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              }
            }
          </div>
        }
      }
    </form>
  `,
  styleUrl: './dynamic-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  form = input.required<UntypedFormGroup>();
  fields = input.required<IFormField[]>();
  class = input<string>();
}
