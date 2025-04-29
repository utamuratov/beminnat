import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { RegionRequest, RegionResponse } from './region.model';

@Injectable()
export class RegionsService {
  private $base = inject(BaseService);

  getRegions() {
    return this.$base.get<RegionResponse[]>('./data/region.json');
  }
  updateRegion(id: number, data: any) {
    return this.$base.put<RegionResponse>(`regions/${id}`, data);
  }
  createRegion(data: any) {
    return this.$base.post<RegionResponse>('regions', data);
  }
  deleteRegion(id: number) {
    return this.$base.delete<RegionResponse>(`regions/${id}`);
  }
}
