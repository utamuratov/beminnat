import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Confirmable } from '../../../../shared/decorators/confirmable.decorator';
import { CategoryService } from '../category/common/category.service';
import { Notify } from '../../../../shared/decorators/notify.decorator';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AsyncClickDirective } from '../../../../shared/directives/async-click.directive';
import { of, tap } from 'rxjs';
import { ChildComponent } from './child/child.component';
import { MyButtonComponent } from './my-button/my-button.component';
import { ExternalLinkComponent } from './external-link/external-link.component';

@Component({
  selector: 'app-test',
  imports: [
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,

    AsyncClickDirective,
    ChildComponent,
    MyButtonComponent,
    ExternalLinkComponent,
  ],
  providers: [CategoryService],
  template: `
    <button my-button>Click me</button>
    <a href="https://kun.uz">Kun uz</a>
    <button mat-button></button>
    <app-child [mySecondClass]="'my-second-class'"></app-child>

    <button nz-button (click)="openAddDialog()">Qo'shish</button>
    <table class="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        @for (user of users(); track $index) {
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <button nz-button nzType="dashed" (click)="delete(user)">
                Delete
              </button>
            </td>
          </tr>
        }

        <button (click)="submit()">Submit</button>
      </tbody>
    </table>

    <nz-modal
      [(nzVisible)]="isVisible"
      [nzTitle]="'Create'"
      [nzContent]="modalContent"
      [nzFooter]="modalFooter"
      (nzOnCancel)="close()"
    >
      <ng-template #modalContent>
        <form [formGroup]="form">
          <nz-form-item>
            <nz-form-label [nzSpan]="24">Name</nz-form-label>
            <nz-form-control
              [nzSpan]="24"
              nzErrorTip="Please input your username!"
            >
              <input
                nz-input
                formControlName="name"
                placeholder="input placeholder"
              />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="24">Description</nz-form-label>
            <nz-form-control
              [nzSpan]="24"
              nzErrorTip="Please input your username!"
            >
              <input
                nz-input
                formControlName="description"
                placeholder="input placeholder"
              />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-template>

      <ng-template #modalFooter>
        <button nz-button nzType="default" (click)="close()">Close</button>
        <button nz-button nzType="primary" [asyncClick]="save.bind(this)">
          Submit
        </button>
      </ng-template>
    </nz-modal>
  `,
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class TestComponent {
  //#region OLD CODE
  users = signal([
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'John2',
    },
    {
      id: 3,
      name: 'John3',
    },
  ]);
  data = [
    {
      name: 'Menu',
      children: [
        {
          name: 'Menu',
          children: [
            {
              name: 'Menu',
              children: [
                {
                  name: 'Menu',
                },
                {
                  name: 'Menu',
                },
                {
                  name: 'Menu',
                },
              ],
            },
            {
              name: 'Menu',
            },
            {
              name: 'Menu',
            },
          ],
        },
        {
          name: 'Menu',
        },
        {
          name: 'Menu',
        },
      ],
    },
    {
      name: 'Menu',
      children: [
        {
          name: 'Menu',
        },
        {
          name: 'Menu',
        },
        {
          name: 'Menu',
        },
      ],
    },
    {
      name: 'Menu',
    },
    {
      name: 'Menu',
    },
  ];

  constructor(private $category: CategoryService) {}

  @Notify('Successfully added', 'Something went wrong')
  submit() {
    return this.$category.create({});
  }

  @Confirmable()
  delete(user: any) {
    this.users.update(() => this.users().filter((u) => u.id !== user.id));
  }
  //#endregion

  isVisible = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  $data = inject(CategoryService);

  save() {
    if (this.form.invalid) {
      return of();
    }

    return this.$data.create(this.form.value).pipe(
      tap(() => {
        console.log('nimadir');
      }),
    );
  }

  openAddDialog() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
