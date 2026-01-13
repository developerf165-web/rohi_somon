import { defineStore } from 'pinia';
import type { Shift, ShiftState } from './types';

const MOCK_SHIFTS: Shift[] = [
  {
    id: 1,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  },
  {
    id: 2,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  },
  {
    id: 3,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  },
  {
    id: 4,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  },
  {
    id: 5,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  },
  {
    id: 6,
    cashboxName: 'Касса №2',
    skladName: 'Склад н.Ашт',
    startTime: '05.01.2026 07:10',
    endTime: '05.01.2026 17:10',
    cashierName: 'Искандаров И. И',
    startBalance: 0.00,
    endBalance: 34345324.76
  }
];

export const useShiftStore = defineStore('shift', {
  state: (): ShiftState => ({
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
    async fetchShifts() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_SHIFTS];
        
        // Filter by search
        if (this.filters.search) {
          const query = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.cashboxName.toLowerCase().includes(query) ||
            item.skladName.toLowerCase().includes(query) ||
            item.cashierName.toLowerCase().includes(query)
          );
        }

        this.totalItems = 60; // Simulated total for pagination as per image

        // Pagination
        const start = (this.filters.page - 1) * this.filters.limit;
        const end = start + this.filters.limit;
        this.items = filtered.slice(0, this.filters.limit); // Use mock data
        
        // Ensure we have enough mock data if page is 1
        if (this.filters.page === 1) {
            this.items = filtered;
        }

      } catch (e) {
        this.error = 'Failed to fetch shifts';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
