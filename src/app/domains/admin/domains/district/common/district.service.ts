import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { GridService } from '../../../shared/grid/common/grid.service';
import { DistrictResponse } from './district.model';

@Injectable()
export class DistrictService extends GridService {
  private $base = inject(BaseService);

  override getAll() {
    return this.$base.get<DistrictResponse[]>('./data/district.json');
  }
  override update(id: number, data: any) {
    return this.$base.put<DistrictResponse>(`district/${id}`, data);
  }
  override create(data: any) {
    return this.$base.post<DistrictResponse>('district', data);
  }
  override delete(id: number) {
    return this.$base.delete<DistrictResponse>(`district/${id}`);
  }
}
