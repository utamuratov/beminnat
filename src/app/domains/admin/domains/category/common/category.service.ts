import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { CategoryResponse } from './category.model';

@Injectable()
export class CategoryService {
  private $base = inject(BaseService);

  getCategories() {
    return this.$base.get<CategoryResponse[]>('category');
  }

  updateCategory(id: number, data: any) {
    return this.$base.put<CategoryResponse>(`category/${id}`, data);
  }

  createCategory(data: any) {
    return this.$base.post<CategoryResponse>('category', data);
  }

  deleteCategory(id: number) {
    return this.$base.delete<CategoryResponse>(`category/${id}`);
  }

  categoryDetail(id: number) {
    return this.$base.get<CategoryResponse>(`category/${id}`);
  }
}
