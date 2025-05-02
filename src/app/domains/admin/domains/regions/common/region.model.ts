export interface RegionRequest {
  name: string;
  code: string;
}

export interface RegionResponse extends RegionRequest {
  id: number;
  country: Country;
}

type Country = RegionResponse;
