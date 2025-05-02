import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class GridService {
  constructor() {}

  abstract getAll(): Observable<any[]>;
  abstract create(data: any): Observable<any>;
  abstract update(id: number, data: any): Observable<any>;
  abstract delete(id: number): Observable<any>;
}
