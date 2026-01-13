export interface Shift {
  id: number | string;
  cashboxName: string; // Касса
  skladName: string;   // Склад
  startTime: string;   // Начало
  endTime: string;     // Конец
  cashierName: string; // Кассир
  startBalance: number;// Баланс начало
  endBalance: number;  // Баланс конец
}

export interface ShiftState {
  items: Shift[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
