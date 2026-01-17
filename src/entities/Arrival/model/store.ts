import { defineStore } from 'pinia';
import type { Arrival, ArrivalState } from './types';

// Mock Data based on the provided image
const MOCK_ARRIVALS: Arrival[] = [
  {
    id: 1,
    date: '29.12.2025',
    supplierId: 1, // Чамшед Сениор Разр..
    skladId: 1,    // н.Ашт
    totalPrice: 5300.79,
    docNumber: '3',
    items: [
      { id: 101, productId: 1, productName: 'Топливо АИ-92', unit: 'л', quantity: 1000, price: 5.3, totalPrice: 5300 },
      { id: 102, productId: 2, productName: 'Масло моторное', unit: 'шт', quantity: 1, price: 0.79, totalPrice: 0.79 }
    ]
  },
  {
    id: 2,
    date: '29.12.2025',
    supplierId: 2, // Файзи Рухшон
    skladId: 2,    // 18мкр
    totalPrice: 2500,
    docNumber: '1',
    items: [
      { id: 201, productId: 3, productName: 'Дизельное топливо', unit: 'л', quantity: 500, price: 5, totalPrice: 2500 }
    ]
  },
  {
    id: 3,
    date: '29.12.2025',
    supplierId: 3, // Файзи Нуриддин
    skladId: 3,    // ш. Бустон
    totalPrice: 25300.01,
    docNumber: '2',
    items: [
      { id: 301, productId: 1, productName: 'Топливо АИ-92', unit: 'л', quantity: 4000, price: 5, totalPrice: 20000 },
      { id: 302, productId: 4, productName: 'Антифриз', unit: 'шт', quantity: 53, price: 100, totalPrice: 5300.01 }
    ]
  },
  {
    id: 4,
    date: '29.12.2025',
    supplierId: 1,
    skladId: 1,
    totalPrice: 5300.79,
    docNumber: '3',
    items: []
  },
  {
    id: 5,
    date: '29.12.2025',
    supplierId: 3,
    skladId: 3,
    totalPrice: 25300.01,
    docNumber: '2',
    items: []
  },
  {
    id: 6,
    date: '29.12.2025',
    supplierId: 1,
    skladId: 1,
    totalPrice: 5300.79,
    docNumber: '3',
    items: []
  }
];

/**
 * Стор для управления сущностью "Приход" (Arrival).
 * 
 * @description
 * Реализует хранение и фильтрацию данных о поступлении товаров.
 * Следует контракту стора для возможности использования в универсальных компонентах.
 */
export const useArrivalStore = defineStore('arrival', {
  state: (): ArrivalState => ({
    items: [],
    totalItems: 0,
    isLoading: false,
    error: null,
    filters: {
      page: 1,
      limit: 10,
      search: ''
    }
  }),

  actions: {
    /**
     * Загружает список приходов с учетом фильтров и пагинации.
     * Эмулирует сетевую задержку.
     */
    async fetchArrivals() {
      this.isLoading = true;
      try {
        // Симуляция API вызова
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_ARRIVALS];
        
        // Фильтрация (поиск по номеру документа или цене для примера)
        if (this.filters.search) {
          const query = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.docNumber.toLowerCase().includes(query) ||
            item.totalPrice.toString().includes(query) ||
            item.date.includes(query)
          );
        }

        this.totalItems = filtered.length;

        // Пагинация
        const start = (this.filters.page - 1) * this.filters.limit;
        const end = start + this.filters.limit;
        this.items = filtered.slice(start, end);

      } catch (e: any) {
        this.error = e.message || 'Ошибка загрузки приходов';
      } finally {
        this.isLoading = false;
      }
    },

    async createArrival(arrival: Omit<Arrival, 'id'>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Auto-generate docNumber if not provided
        let docNumber = arrival.docNumber;
        if (!docNumber) {
            const nextNum = Math.max(...MOCK_ARRIVALS.map(a => parseInt(a.docNumber) || 0), 0) + 1;
            docNumber = nextNum.toString();
        }

        const newArrival = { 
            ...arrival, 
            docNumber,
            id: Math.random().toString(36).substr(2, 9) 
        } as Arrival;
        
        MOCK_ARRIVALS.unshift(newArrival);
        await this.fetchArrivals();
        return true;
      } catch (e: any) {
        this.error = e.message || 'Ошибка при создании прихода';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateArrival(id: number | string, arrival: Partial<Arrival>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_ARRIVALS.findIndex(item => item.id == id);
        if (index !== -1) {
          MOCK_ARRIVALS[index] = { ...MOCK_ARRIVALS[index], ...arrival, id } as Arrival;
          await this.fetchArrivals();
        }
        return true;
      } catch (e: any) {
        this.error = e.message || 'Ошибка при обновлении прихода';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteArrival(id: number | string) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // В реальном приложении здесь был бы API вызов
        const index = MOCK_ARRIVALS.findIndex(a => a.id === id);
        if (index !== -1) {
          MOCK_ARRIVALS.splice(index, 1);
          await this.fetchArrivals();
          return true;
        }
        return false;
      } catch (e: any) {
        this.error = e.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // Псевдонимы для универсальных компонентов
    async fetchItems() {
      return this.fetchArrivals();
    },
    async createItem(payload: any) {
      return this.createArrival(payload);
    },
    async updateItem(id: string | number, payload: any) {
      return this.updateArrival(id, payload);
    }
  }
});
