import { defineStore } from 'pinia';
import type { Expense, ExpenseState } from './types';

// Mock data matching Figma design moved outside to persist changes during session
const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    date: '29.12.2025',
    fromSkladId: 1, // 18мкр
    toSkladId: 2,   // н.Ашт
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
    fromSkladId: 2,
    toSkladId: 1,
    totalPrice: 2500,
    docNumber: '1',
    items: [
      { id: 201, productId: 3, productName: 'Дизельное топливо', unit: 'л', quantity: 500, price: 5, totalPrice: 2500 }
    ]
  },
  {
    id: 3,
    date: '29.12.2025',
    fromSkladId: 2,
    toSkladId: 3, // ш. Бустон
    totalPrice: 25300.01,
    docNumber: '2',
    items: [
      { id: 301, productId: 1, productName: 'Топливо АИ-92', unit: 'л', quantity: 4000, price: 5, totalPrice: 20000 }
    ]
  },
  {
    id: 4,
    date: '29.12.2025',
    fromSkladId: 2,
    toSkladId: 3,
    totalPrice: 5300.79,
    docNumber: '3',
    items: []
  },
  {
    id: 5,
    date: '29.12.2025',
    fromSkladId: 2,
    toSkladId: 3,
    totalPrice: 25300.01,
    docNumber: '2',
    items: []
  },
  {
    id: 6,
    date: '29.12.2025',
    fromSkladId: 2,
    toSkladId: 3,
    totalPrice: 5300.79,
    docNumber: '3',
    items: []
  }
];

export const useExpenseStore = defineStore('expense', {
  state: (): ExpenseState => ({
    items: [],
    totalItems: 0,
    isLoading: false,
    error: null,
    filters: {
      page: 1,
      limit: 10,
      search: '',
    },
  }),

  actions: {
    async fetchExpenses() {
      this.isLoading = true;
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use the module-level MOCK_EXPENSES
        let filtered = [...MOCK_EXPENSES];
        if (this.filters.search) {
          const s = this.filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.docNumber.toLowerCase().includes(s) ||
            item.date.toLowerCase().includes(s)
          );
        }

        this.items = filtered;
        this.totalItems = filtered.length;
      } catch (err: any) {
        this.error = err.message || 'Ошибка при загрузке расходов';
      } finally {
        this.isLoading = false;
      }
    },

    async createExpense(expense: Omit<Expense, 'id'>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Auto-generate docNumber
        let docNumber = expense.docNumber;
        if (!docNumber) {
            const nextNum = Math.max(...MOCK_EXPENSES.map(e => parseInt(e.docNumber) || 0), 0) + 1;
            docNumber = nextNum.toString();
        }

        const newExpense = { 
            ...expense, 
            docNumber,
            id: Math.random().toString(36).substr(2, 9) 
        } as Expense;
        
        MOCK_EXPENSES.unshift(newExpense);
        await this.fetchExpenses();
        return true;
      } catch (err: any) {
        this.error = err.message || 'Ошибка при создании расхода';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateExpense(id: number | string, expense: Partial<Expense>) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_EXPENSES.findIndex(item => item.id == id);
        if (index !== -1) {
          MOCK_EXPENSES[index] = { ...MOCK_EXPENSES[index], ...expense, id } as Expense;
          await this.fetchExpenses();
        }
        return true;
      } catch (err: any) {
        this.error = err.message || 'Ошибка при обновлении расхода';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteExpense(id: number | string) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_EXPENSES.findIndex(item => item.id == id);
        if (index !== -1) {
          MOCK_EXPENSES.splice(index, 1);
          await this.fetchExpenses();
        }
        return true;
      } catch (err: any) {
        this.error = err.message || 'Ошибка при удалении расхода';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // Standardized aliases
    async createItem(payload: any) {
      return this.createExpense(payload);
    },
    async updateItem(id: string | number, payload: any) {
      return this.updateExpense(id, payload);
    },
    async fetchItems() {
        return this.fetchExpenses();
    }
  }
});
