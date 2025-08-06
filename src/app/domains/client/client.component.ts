import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BaseService } from '../../core/services/base.service';
import { DITokens } from '../../core/utils/di.tokens';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-client',
  imports: [NzButtonModule, TranslocoModule],
  providers: [
    BaseService,
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4200',
    },
  ],
  template: `<p>{{ 'Mood types:' | transloco }}</p>
    <div class="flex gap-2">
      @for (m of mood(); track $index) {
        <button nz-button (click)="chooseMood(m)">
          {{ m }}
        </button>
      }
      <button nz-button nzDanger (click)="remove()">Remove first mood</button>
      <button nz-button (click)="unshift()">Unshift mood</button>
      <button nz-button (click)="refresh()">Refresh mood types</button>
    </div>
    <h1>My mood: {{ myMood() }}</h1> `,
  styleUrl: './client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit {
  mood = signal<string[]>([]);
  myMood = linkedSignal(() => this.mood()[0]);

  private $base = inject(BaseService);
  private $message = inject(NzMessageService);
  private $cdr = inject(ChangeDetectorRef);
  private $transloco = inject(TranslocoService);

  ngOnInit(): void {
    this.$transloco.langChanges$.subscribe(() => {
      this.$base.get('data/mood.json').subscribe((mood) => {
        this.mood.set(mood);
        this.$message.success('moodSuccessfullyFetched');
        this.$message.warning('moodWarningFetched');
        this.$cdr.markForCheck();
      });
    });
  }

  chooseMood(m: string) {
    this.myMood.set(m);
  }

  remove() {
    this.mood.set(this.mood().slice(1));
  }

  unshift() {
    // const newMood = this.mood();
    // newMood.unshift('😑');
    // this.mood.set(newMood);

    const newMood = [...this.mood()];
    newMood.unshift('😑');
    this.mood.set(newMood);
  }

  refresh() {
    this.mood.set(['😀', '😆', '🥲']);
  }
}
