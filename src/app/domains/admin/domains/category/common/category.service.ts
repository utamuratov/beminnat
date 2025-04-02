import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';

@Injectable()
export class CategoryService {
  private $base = inject(BaseService);

  getCategories() {
    return this.$base.get('category');
  }
}
