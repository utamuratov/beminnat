import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Confirmable } from '../../../../shared/decorators/confirmable.decorator';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CategoryService } from '../category/common/category.service';
import { Notify } from '../../../../shared/decorators/notify.decorator';

@Component({
  selector: 'app-test',
  imports: [NgTemplateOutlet, NzButtonModule],
  providers: [CategoryService],
  template: `
    <!-- <ng-container
      *ngTemplateOutlet="menu; context: { $implicit: data }"
    ></ng-container> -->

    <!-- <ng-template #menu let-menuData>
      <ul class="pl-4">
        @for (item of menuData; track $index) {
          <li>
            {{ item.name }}

            @if (item.children && item.children.length > 0) {
              <ng-container
                *ngTemplateOutlet="menu; context: { $implicit: item.children }"
              ></ng-container>
            }
          </li>
        }
      </ul>
    </ng-template> -->

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
  `,
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class TestComponent {
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
}
