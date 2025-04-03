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

  get<T = any>(url: string) {
    return mapToResult(this.http.get<T>(this.treatUrl(url)));
  }

  post<T = any>(url: string, data: any) {
    return mapToResult(this.http.post<T>(this.treatUrl(url), data));
  }

  put<T = any>(url: string, data: any) {
    return mapToResult(this.http.put<T>(this.treatUrl(url), data));
  }

  delete<T = any>(url: string) {
    return mapToResult(this.http.delete<T>(this.treatUrl(url)));
  }
}

// export const mapToResult = (obs: Observable<{ result?: any }>) =>
//   obs.pipe(
//     catchError((error) => of({ error, result: null })),
//     shareReplay(1)
//   );

export function mapToResult<T>(obs: Observable<T>) {
  return obs.pipe(
    catchError((error) => of({ error, result: null } as T)),
    shareReplay(1),
  );
}
