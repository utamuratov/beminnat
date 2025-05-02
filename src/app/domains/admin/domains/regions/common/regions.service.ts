import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { RegionRequest, RegionResponse } from './region.model';
import { GridService } from '../../../shared/grid/common/grid.service';

@Injectable()
export class RegionsService extends GridService {
  private $base = inject(BaseService);

  override getAll() {
    return this.$base.get<RegionResponse[]>('./data/region.json');
  }
  override update(id: number, data: any) {
    return this.$base.put<RegionResponse>(`regions/${id}`, data);
  }
  override create(data: any) {
    return this.$base.post<RegionResponse>('regions', data);
  }
  override delete(id: number) {
    return this.$base.delete<RegionResponse>(`regions/${id}`);
  }
}
