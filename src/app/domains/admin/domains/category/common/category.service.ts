import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { CategoryResponse } from './category.model';
import { GridService } from '../../../shared/grid/common/grid.service';

@Injectable()
export class CategoryService extends GridService {
  private $base = inject(BaseService);

  override getAll() {
    return this.$base.get<CategoryResponse[]>('category');
  }

  override update(id: number, data: any) {
    return this.$base.put<CategoryResponse>(`category/${id}`, data);
  }

  override create(data: any) {
    return this.$base.post<CategoryResponse>('category', data);
  }

  override delete(id: number) {
    return this.$base.delete<CategoryResponse>(`category/${id}`);
  }
}
