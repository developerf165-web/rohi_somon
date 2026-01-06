export interface ExpenseItem {
  id: number | string;
  productId: number | string;
  productName?: string;
  unit?: string;
  quantity: number;
  price: number;
  totalPrice?: number;
}

export interface Expense {
  id: number | string;
  date: string;
  fromSkladId: number | string;
  toSkladId: number | string;
  totalPrice: number;
  docNumber: string;
  items: ExpenseItem[];
}

export interface ExpenseState {
  items: Expense[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
}
