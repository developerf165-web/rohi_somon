export interface Sale {
  id: number | string;
  pointName: string;   // Точка
  cashboxName: string; // Касса
  date: string;        // Дата
  amount: number;      // Сумма
  type: 'Нал.' | 'Без нал.'; // Тип
}

export interface SaleState {
  items: Sale[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
