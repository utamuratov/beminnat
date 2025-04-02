import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorComponent } from '../../../shared/components/error/error.component';

export interface SignInForm {
  login: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, ErrorComponent],
  template: `
    <form
      [formGroup]="form"
      style="display: flex; flex-direction: column; gap: 5px; width: 200px;"
    >
      <input
        type="text"
        name="login"
        placeholder="Login"
        formControlName="login"
      />
      <error [control]="form.controls.login"></error>

      <input
        type="password"
        name="password"
        placeholder="Password"
        formControlName="password"
      />
      <error [control]="form.controls.password"></error>

      <br />
      <button (click)="submit()" [disabled]="form.pristine">Sign In</button>
    </form>
  `,
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private fb = inject(NonNullableFormBuilder);
  private $auth = inject(AuthService);
  form = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.maxLength(7), Validators.minLength(5)],
    ],
    password: ['', Validators.required],
    // age: new FormControl({ value: 0, disabled: true }),
  });

  submit() {
    console.log('submit', this.form.getRawValue());
    if (this.form.invalid) {
      alert('Invalid form');
      return;
    }

    console.log(this.form.value);
    console.log(this.form.getRawValue());

    console.log(this.form.controls.login.value);
    console.log(this.form.get('login')?.value);

    this.$auth.login(this.form.getRawValue());

    // DO smth
  }
}
