import { defineStore } from 'pinia';
import type { Sale, SaleState } from './types';

const MOCK_SALES: Sale[] = [
  {
    id: 1,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Без нал.'
  },
  {
    id: 2,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Без нал.'
  },
  {
    id: 3,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Нал.'
  },
  {
    id: 4,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Без нал.'
  },
  {
    id: 5,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Нал.'
  },
  {
    id: 6,
    pointName: 'н.Ашт',
    cashboxName: 'Касса № 1',
    date: '07.01.2026',
    amount: 34675423.78,
    type: 'Без нал.'
  }
];

export const useSaleStore = defineStore('sale', {
  state: (): SaleState => ({
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
    async fetchSales() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_SALES];
        
        // Filter by search
        if (this.filters.search) {
          const query = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.pointName.toLowerCase().includes(query) ||
            item.cashboxName.toLowerCase().includes(query) ||
            item.date.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
          );
        }

        this.totalItems = 120; // Simulated total for pagination as per image

        this.items = filtered;

      } catch (e) {
        this.error = 'Failed to fetch sales';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
