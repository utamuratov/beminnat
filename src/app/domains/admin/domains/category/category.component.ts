import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CategoryService } from './common/category.service';
import { BaseService } from '../../../../core/services/base.service';
import { CategoryResponse } from './common/category.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category',
  imports: [],
  providers: [CategoryService],
  template: `
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
      </thead>
      <tbody>
        @for (item of data(); track item) {
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent implements OnInit {
  private $data = inject(CategoryService);
  // private $cdr = inject(ChangeDetectorRef);
  // data: CategoryResponse[] = [];

  data$ = this.$data.getCategories();

  data = toSignal(this.$data.getCategories());

  ngOnInit() {
    // this.$data.getCategories().subscribe((res) => {
    //   this.data = res;
    //   console.log(this.data);
    //   this.$cdr.markForCheck();
    // });
  }
}
