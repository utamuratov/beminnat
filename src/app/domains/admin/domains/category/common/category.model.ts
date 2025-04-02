export interface CategoryRequest {
  name: string;
  description: string;
}

export interface CategoryResponse extends CategoryRequest {
  id: number;
}
