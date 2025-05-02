export interface CategoryRequest {
  name: string;
  description: string;
  createdDate: Date;
  photo: string;
}

export interface CategoryResponse extends CategoryRequest {
  id: number;
}
