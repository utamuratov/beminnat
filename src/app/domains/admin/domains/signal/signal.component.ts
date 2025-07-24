import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FilterNamesPipe } from './filter-names.pipe';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../category/common/category.service';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signal',
  imports: [
    NzButtonModule,
    NzInputModule,
    FilterNamesPipe,
    AsyncPipe,
    FormsModule,
    RouterLink,
  ],
  providers: [CategoryService],
  template: `
    <p class="text-xl">SIGNAL</p>
    <!-- <p>a = {{ a() }}</p>
    <p>b = {{ b() }}</p>
    <p>s = {{ s() }}</p>

    <button nz-button (click)="changeSides()">Change sides</button> -->
    <input
      [value]="searchText()"
      (input)="navigateTo($event)"
      type="text"
      nz-input
    />
    <ul>
      @for (name of filteredNames(); track $index) {
        <li>{{ name }}</li>
      }
    </ul>

    <!-- @for (item of category$(); track $index) {
      {{ item.name }},
    } -->

    <button nz-button [routerLink]="[]" [queryParams]="{ searchText: 'John' }">
      change param
    </button>
  `,
  styleUrl: './signal.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalComponent {
  //#region OLD
  a = signal(10);
  b = signal(15);

  s = computed(() => {
    console.log('s calculated');

    return this.a() * this.b();
  });

  changeSides() {
    this.a.set(Math.floor(Math.random() * 20));
    this.b.update(() => this.b() * 2);
  }
  //#endregion

  names = signal(['John', 'Ali', 'Bob', 'Alice', 'Mark', 'Twins']);
  searchText = computed(() => this.queryParam()?.['searchText']);
  filteredNames = computed(() =>
    this.names().filter((w) =>
      w.toLowerCase().includes(this.searchText().toLowerCase()),
    ),
  );

  searchtextOzgarishiQiziEmas = signal(true);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  category$ = toSignal(inject(CategoryService).getAll());
  queryParam = toSignal(this.route.queryParams);

  obs$ = toObservable(this.searchText);

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor() {
    // route.queryParams.subscribe((qp) => {
    //   console.log(qp);
    // });

    this.obs$.subscribe((w) => {
      console.log('obs', w);
    });

    effect(() => {
      console.log('Effect works');
      console.log(this.queryParam());

      if (this.searchtextOzgarishiQiziEmas()) {
        console.log(this.searchText());
      } else {
        console.log('Noting changed');
      }
    });
  }

  navigateTo(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.router.navigate([], { queryParams: { searchText: value } });
  }
}
