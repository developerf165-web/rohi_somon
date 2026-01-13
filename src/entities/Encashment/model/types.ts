export interface Encashment {
  id: number | string;
  fromCashbox: string;  // От касса
  toCashbox: string;    // На кассу
  encashmentOfficer: string; // Инкасатор
  amount: number;       // Сумма
  date: string;         // Дата
  shift: number;        // Смена
  status: 'В пути' | 'Успешно' | 'Отмена'; // Статус
}

export interface EncashmentState {
  items: Encashment[];
  totalItems: number;
  filters: {
    page: number;
    limit: number;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}
