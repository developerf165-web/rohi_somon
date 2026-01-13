import { defineStore } from 'pinia';
import type { Cashbox, CashboxState } from './types';

const MOCK_CASHBOXES: Cashbox[] = [
  {
    id: 1,
    number: 'Касса №12',
    skladId: 1,
    skladName: 'Главный',
    balance: 2344766.00,
    isMain: true,
    description: 'Описания...'
  },
  {
    id: 2,
    number: 'Касса №123',
    skladId: 2,
    skladName: 'н.Ашт',
    balance: 2344766.00,
    isMain: false,
    description: 'Описания...'
  },
  {
    id: 3,
    number: 'Касса',
    skladId: 3,
    skladName: 'Главный',
    balance: 2344766.00,
    isMain: true,
    description: 'Описания...'
  },
  {
    id: 4,
    number: 'Касса №12',
    skladId: 4,
    skladName: 'н.Ашт',
    balance: 2344766.00,
    isMain: false,
    description: 'Описания...'
  },
  {
    id: 5,
    number: 'Касса №12',
    skladId: 5,
    skladName: 'н.Ашт',
    balance: 2344766.00,
    isMain: false,
    description: 'Описания...'
  },
  {
    id: 6,
    number: 'Касса №12',
    skladId: 6,
    skladName: 'н.Ашт',
    balance: 2344766.00,
    isMain: false,
    description: 'Описания...'
  }
];

export const useCashboxStore = defineStore('cashbox', {
  state: (): CashboxState => ({
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
    async fetchCashboxes() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_CASHBOXES];
        
        if (this.filters.search) {
          const query = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.number.toLowerCase().includes(query) ||
            item.skladName?.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          );
        }

        this.totalItems = filtered.length;

        const start = (this.filters.page - 1) * this.filters.limit;
        const end = start + this.filters.limit;
        this.items = filtered.slice(start, end);

      } catch (e) {
        this.error = 'Failed to fetch cashboxes';
      } finally {
        this.isLoading = false;
      }
    },

    async createCashbox(data: Partial<Cashbox>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newId = Math.max(0, ...this.items.map(i => Number(i.id))) + 1;
        const newItem: Cashbox = {
          id: newId,
          number: data.number || '',
          skladId: data.skladId || '',
          skladName: data.skladName || '',
          balance: data.balance || 0,
          isMain: data.isMain || false,
          description: data.description || '',
        };
        
        MOCK_CASHBOXES.unshift(newItem);
        await this.fetchCashboxes();
        return true;
      } catch (e) {
        this.error = 'Failed to create cashbox';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateCashbox(id: number | string, data: Partial<Cashbox>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_CASHBOXES.findIndex(i => i.id == id);
        
        if (index !== -1) {
          const item = MOCK_CASHBOXES[index];
          if (item) {
            MOCK_CASHBOXES[index] = {
              ...item,
              ...data,
              id: item.id,
            } as Cashbox;
            await this.fetchCashboxes();
            return true;
          }
        }
        return false;
      } catch (e) {
        this.error = 'Failed to update cashbox';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteCashbox(id: number | string) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_CASHBOXES.findIndex(i => i.id == id);
        if (index !== -1) {
          MOCK_CASHBOXES.splice(index, 1);
          await this.fetchCashboxes();
          return true;
        }
        return false;
      } catch (e) {
        this.error = 'Failed to delete cashbox';
        return false;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
