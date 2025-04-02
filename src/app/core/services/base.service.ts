import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { DITokens } from '../utils/di.tokens';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private treatUrl(url: string) {
    return `${this.endpoint}/${url}`;
  }

  constructor(
    private http: HttpClient,
    @Inject(DITokens.API_ENDPOINT) private endpoint: string,
  ) {}

  get(url: string) {
    return mapToResult(this.http.get(this.treatUrl(url)));
  }

  post(url: string, data: any) {
    return mapToResult(this.http.post(this.treatUrl(url), data));
  }

  put(url: string, data: any) {
    return mapToResult(this.http.put(this.treatUrl(url), data));
  }

  delete(url: string) {
    return mapToResult(this.http.delete(this.treatUrl(url)));
  }
}

// export const mapToResult = (obs: Observable<{ result?: any }>) =>
//   obs.pipe(
//     catchError((error) => of({ error, result: null })),
//     shareReplay(1)
//   );

export function mapToResult(obs: Observable<any>) {
  return obs.pipe(
    catchError((error) => of({ error, result: null })),
    shareReplay(1),
  );
}
