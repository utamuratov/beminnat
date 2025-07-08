import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-typed-form',
  imports: [
    NzButtonComponent,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
  ],
  template: `
    <form [formGroup]="form">
      <label>
        Question
        <input type="text" formControlName="question" nz-input />
      </label>

      <div formArrayName="answers">
        @for (item of answers.controls; track $index) {
          <div [formGroup]="item">
            <input type="checkbox" formControlName="correct" />
            <input type="text" nz-input formControlName="answer" />
          </div>
        }
      </div>

      <button nz-button (click)="addControl()">+</button>
    </form>
    <button nz-button (click)="save()">Save</button>
  `,
  styleUrl: './typed-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypedFormComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    question: '',
    answers: this.fb.array<
      FormGroup<{
        answer: FormControl<string>;
        correct: FormControl<boolean>;
      }>
    >([]),
  });

  get answers() {
    return this.form.controls.answers;
  }

  addControl() {
    this.answers.push(
      this.fb.group({
        answer: '',
        correct: new FormControl(false, { nonNullable: true }),
      }),
    );
  }

  save() {
    console.log(this.form.value);
  }
}
