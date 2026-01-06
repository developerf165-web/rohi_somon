export interface ArrivalItem {
  id: number | string;
  productId: number | string;
  productName?: string;
  unit?: string;
  quantity: number;
  price: number;
  totalPrice?: number;
}

export interface Arrival {
  id: number | string;
  date: string;
  supplierId: number | string;
  skladId: number | string;
  totalPrice: number;
  docNumber: string;
  items: ArrivalItem[];
}

export interface ArrivalState {
  items: Arrival[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
}
