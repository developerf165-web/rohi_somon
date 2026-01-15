export interface Point {
  id: number | string;
  title: string;
  address: string;
  image?: string;
  lat?: string;
  lng?: string;
  comment?: string;
  images?: string[];
}

export interface CreatePointDto {
  title: string;
  address: string;
  lat: number | string;
  lng: number | string;
  comment: string;
  images?: string[];
}

export interface PointState {
  points: Point[];
  isLoading: boolean;
  error: string | null;
  createForm: CreatePointDto;
}
