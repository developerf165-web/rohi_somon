import { defineStore } from 'pinia';
import type { Encashment, EncashmentState } from './types';

const MOCK_ENCASHMENTS: Encashment[] = [
  {
    id: 1,
    fromCashbox: 'Касса №24',
    toCashbox: 'Касса №12',
    encashmentOfficer: 'Шахобов Нуриддин',
    amount: 12344445.50,
    date: '20.01.01',
    shift: 2,
    status: 'В пути'
  },
  {
    id: 2,
    fromCashbox: 'Касса №24',
    toCashbox: 'Касса №12',
    encashmentOfficer: 'Шахобов Нуриддин',
    amount: 12344445.50,
    date: '20.01.01',
    shift: 2,
    status: 'В пути'
  },
  {
    id: 3,
    fromCashbox: 'Касса №24',
    toCashbox: 'Касса №12',
    encashmentOfficer: 'Шахобов Нуриддин',
    amount: 12344445.50,
    date: '20.01.01',
    shift: 2,
    status: 'Успешно'
  },
  {
    id: 4,
    fromCashbox: 'Касса №24',
    toCashbox: 'Касса №12',
    encashmentOfficer: 'Шахобов Нуриддин',
    amount: 12344445.50,
    date: '20.01.01',
    shift: 2,
    status: 'В пути'
  },
  {
    id: 5,
    fromCashbox: 'Касса №24',
    toCashbox: 'Касса №12',
    encashmentOfficer: 'Шахобов Нуриддин',
    amount: 12344445.50,
    date: '20.01.01',
    shift: 2,
    status: 'Отмена'
  }
];

export const useEncashmentStore = defineStore('encashment', {
  state: (): EncashmentState => ({
    items: [],
    totalItems: 0,
    filters: {
      page: 1,
      limit: 10,
      search: ''
    },
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchEncashments() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_ENCASHMENTS];
        
        // Filter by search
        if (this.filters.search) {
          const query = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.fromCashbox.toLowerCase().includes(query) ||
            item.toCashbox.toLowerCase().includes(query) ||
            item.encashmentOfficer.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query)
          );
        }

        this.totalItems = 250; // Simulated total for pagination as per image
        this.items = filtered;

      } catch (e) {
        this.error = 'Failed to fetch encashments';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
