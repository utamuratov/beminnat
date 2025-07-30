import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BaseService } from '../../core/services/base.service';
import { DITokens } from '../../core/utils/di.tokens';

@Component({
  selector: 'app-client',
  imports: [NzButtonModule],
  providers: [
    BaseService,
    {
      provide: DITokens.API_ENDPOINT,
      useValue: 'http://localhost:4200',
    },
  ],
  template: `<p>Mood types:</p>
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

  ngOnInit(): void {
    this.$base.get('data/mood.json').subscribe((mood) => {
      this.mood.set(mood);
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
