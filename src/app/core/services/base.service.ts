import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  get(url: string) {
    return mapToResult(this.http.get(url));
  }

  post(url: string, data: any) {
    return mapToResult(this.http.post(url, data));
  }

  put(url: string, data: any) {
    return mapToResult(this.http.put(url, data));
  }

  delete(url: string) {
    return mapToResult(this.http.delete(url));
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
    shareReplay(1)
  );
}
