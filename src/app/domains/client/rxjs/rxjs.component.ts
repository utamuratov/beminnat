import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from '../../admin/domains/category/common/category.service';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  from,
  interval,
  map,
  of,
  reduce,
  ReplaySubject,
  share,
  shareReplay,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  imports: [],
  providers: [CategoryService],
  template: `<p>rxjs works!</p>`,
  styleUrl: './rxjs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RxjsComponent {
  obs$ = from([1, false, 4, 11, null, undefined, 14]).pipe(
    filter((w) => typeof w === 'number'),
  );
  obs1$ = of(1, false, 4, 11, null, undefined, 14);

  firstName$ = of('Odilbek');
  lastName$ = of('Utamuratov');

  category$ = inject(CategoryService).getAll().pipe(share());
  share$ = interval(1000).pipe(take(6), shareReplay(1));

  subject$$ = new Subject<number>();
  bSubject$$ = new ReplaySubject<string>(3);

  constructor() {
    // this.obs$.subscribe(console.log);

    // this.obs$
    //   .pipe(
    //     filter((w) => w % 2 === 1),
    //     reduce((acc, curr) => acc + curr),
    //     tap(console.log),
    //   )
    //   .subscribe();

    // this.obs$
    //   .pipe(
    //     filter((w) => typeof w === 'number'),
    //     filter((w) => w % 2 === 0),
    //     reduce((acc, curr) => acc + curr),
    //     tap(console.log),
    //   )
    //   .subscribe();

    // this.concat();
    // this.firstName$ = of('dsds');
    // this.firstName$.subscribe();

    // this.obs1$.subscribe(console.log);

    // this.getCategories();
    this.getSubscribers();
  }

  getSubscribers() {
    // this.subject$$.next(-1);
    // this.subject$$.next(0);
    // this.subject$$.subscribe((w) => console.log('Subject1: ' + w));
    // this.subject$$.next(1);
    // this.subject$$.next(2);
    // this.subject$$.next(3);
    // this.subject$$.subscribe((w) => console.log('Subject2: ' + w));
    // this.subject$$.next(4);
    // this.subject$$.next(5);

    this.bSubject$$.next('Salom');
    this.bSubject$$.next('Salom1');
    this.bSubject$$.next('Salom2');
    this.bSubject$$.next('Salom3');
    this.bSubject$$.next('Salom4');
    this.bSubject$$.subscribe(console.log);
    this.bSubject$$.next('Salom5');
    this.bSubject$$.next('Salom6');
  }

  getCategories() {
    // this.category$.subscribe((categories) => {
    //   console.log('Malumot: ', categories);
    // });

    // this.category$.subscribe((categories) => {
    //   console.log('Malumot: ', categories);
    // });

    // setTimeout(() => {
    //   this.category$.subscribe((categories) => {
    //     console.log('Malumot: ', categories);
    //   });
    // }, 2000);

    this.share$.subscribe((w) => {
      console.log('Subscriber 1: ', w);
    });

    setTimeout(() => {
      this.share$.subscribe((w) => {
        console.warn('Subscriber 2: ', w);
      });
    }, 4000);
  }

  fullName = '';
  concat() {
    this.firstName$.subscribe((firstName) => {
      this.lastName$.subscribe((lastName) => {
        this.fullName = `${firstName} ${lastName}`;
      });
    });

    this.firstName$
      .pipe(
        switchMap((firstName) => {
          return this.lastName$.pipe(
            map((lastName) => `${firstName} ${lastName}`),
          );
        }),
      )
      .subscribe((fullName) => (this.fullName = fullName));

    forkJoin([this.firstName$, this.lastName$]).subscribe((data) => {
      this.fullName = `${data[0]} ${data[1]}`;
    });
  }
}
