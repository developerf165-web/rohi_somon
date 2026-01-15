export interface Nomenclature {
  id: number | string;
  photo?: string;
  name: string;
  unit: string;
  type: 'Продукт' | 'Топливо';
  barcode: string;
  price: number;
  category?: string;
  comment?: string;
}

export interface CreateNomenclatureDto {
  photo?: string;
  name: string;
  unit: string;
  type: 'Продукт' | 'Топливо';
  barcode: string;
  price: number;
  category?: string;
  comment?: string;
}

export interface NomenclatureState {
  items: Nomenclature[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
