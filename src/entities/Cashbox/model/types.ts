export interface Cashbox {
  id: number | string;
  number: string;
  skladId: number | string;
  skladName?: string;
  balance: number;
  isMain: boolean;
  description: string;
}

export interface CashboxState {
  items: Cashbox[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
