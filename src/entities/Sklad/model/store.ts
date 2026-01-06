import { defineStore } from 'pinia';
import type { Sklad, SkladState, CreateSkladDto } from './types';

// Mock Data
const MOCK_SKLADS: Sklad[] = [
  {
    id: 1,
    name: 'Склад номер 1',
    pointId: 1,
    type: 'Магазин',
    createdAt: '12-05-2023'
  },
  {
    id: 2,
    name: 'Склад номер 2',
    pointId: 2,
    type: 'GSM',
    createdAt: '15-08-2023'
  },
  {
    id: 3,
    name: 'Центральный склад',
    pointId: 1,
    type: 'Магазин',
    createdAt: '10-11-2023'
  },
  {
    id: 4,
    name: 'Склад GSM 2',
    pointId: 3,
    type: 'Магазин',
    createdAt: '05-01-2024'
  },
  {
    id: 5,
    name: 'Резервный склад',
    pointId: 1,
    type: 'Магазин',
    createdAt: '22-03-2024'
  },
];

export const useSkladStore = defineStore('sklad', {
  state: (): SkladState => ({
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
    async fetchSklads() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_SKLADS];
        
        // Filter by search
        if (this.filters.search) {
            const query = this.filters.search.toLowerCase();
            filtered = filtered.filter(item => item.name.toLowerCase().includes(query));
        }

        this.totalItems = filtered.length;

        // Pagination
        const start = (this.filters.page - 1) * this.filters.limit;
        const end = start + this.filters.limit;
        this.items = filtered.slice(start, end);

      } catch (e) {
        this.error = 'Failed to fetch sklads';
      } finally {
        this.isLoading = false;
      }
    },

    async createSklad(dto: CreateSkladDto) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newId = Math.max(0, ...MOCK_SKLADS.map(i => Number(i.id))) + 1;
        const newItem: Sklad = {
          id: newId,
          ...dto,
          createdAt: new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')
        };
        MOCK_SKLADS.unshift(newItem); // Add to mock data source
        await this.fetchSklads(); // Refresh list
        return true;
      } catch (e) {
        this.error = 'Failed to create sklad';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateSklad(id: number | string, dto: CreateSkladDto) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = MOCK_SKLADS.findIndex(i => i.id == id);
        
        if (index !== -1 && MOCK_SKLADS[index]) {
             MOCK_SKLADS[index] = {
                 id: MOCK_SKLADS[index].id,
                 createdAt: MOCK_SKLADS[index].createdAt,
                 name: dto.name,
                 pointId: dto.pointId,
                 type: dto.type
             };
             await this.fetchSklads();
             return true;
        }
        return false;
      } catch (e) {
        this.error = 'Failed to update sklad';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteSklad(id: number | string) {
        const index = MOCK_SKLADS.findIndex(i => i.id === id);
        if (index !== -1) {
            MOCK_SKLADS.splice(index, 1);
            await this.fetchSklads();
        }
    }
  }
});
