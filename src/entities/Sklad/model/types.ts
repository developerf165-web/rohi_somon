export interface Sklad {
  id: number | string;
  name: string;
  pointId: number | string; // Linked to a Point
  type: 'Магазин' | 'GSM';
  createdAt: string;
}

export interface CreateSkladDto {
  name: string;
  pointId: number | string;
  type: 'Магазин' | 'GSM';
}

export interface SkladState {
  items: Sklad[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
