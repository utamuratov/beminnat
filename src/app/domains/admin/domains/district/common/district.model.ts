export interface DistrictRequest {
  name: string;
  code: string;
}

export interface DistrictResponse extends DistrictRequest {
  id: number;
}
