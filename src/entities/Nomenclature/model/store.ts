import { defineStore } from 'pinia';
import type { Nomenclature, NomenclatureState, CreateNomenclatureDto } from './types';

import chanelImg from '@/assets/chanel.jpg'; 

// Mock Data
const MOCK_ITEMS: Nomenclature[] = [
  { id: 1, name: 'Катошка', unit: 'кг', type: 'Продукт', barcode: '412342341234124', price: 5.00, photo: '', category: 'Овощи', comment: 'Свежая картошка' },
  { id: 2, name: 'Газ', unit: 'литр', type: 'Топливо', barcode: '88888888', price: 4.50, photo: '', category: 'Топливо', comment: 'Высокое качество' },
  { id: 3, name: 'RCola 1', unit: 'шт', type: 'Продукт', barcode: '412342341234124', price: 12.00, photo: chanelImg, category: 'Напитки', comment: 'Очень популярно' },
  { id: 4, name: 'Газ', unit: 'литр', type: 'Топливо', barcode: '99999999', price: 4.50, photo: '', category: 'Топливо', comment: '' },
  { id: 5, name: 'Метан', unit: 'м³', type: 'Топливо', barcode: '77777777', price: 3.20, photo: '', category: 'Топливо', comment: '' },
];

export const useNomenclatureStore = defineStore('nomenclature', {
  state: (): NomenclatureState => ({
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
    async fetchItems() {
      this.isLoading = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_ITEMS];
        
        // Filter by search
        if (this.filters.search) {
            const query = this.filters.search.toLowerCase();
            filtered = filtered.filter(item => item.name.toLowerCase().includes(query));
        }

        console.log('Nomenclature Store: Fetched Items', filtered);

        this.totalItems = filtered.length;

        // Pagination
        const start = (this.filters.page - 1) * this.filters.limit;
        const end = start + this.filters.limit;
        this.items = filtered.slice(start, end);

      } catch (e) {
        this.error = 'Failed to fetch nomenclature';
      } finally {
        this.isLoading = false;
      }
    },

    async createItem(dto: CreateNomenclatureDto) {
        this.isLoading = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const newItem: Nomenclature = {
                id: Math.floor(Math.random() * 10000),
                name: dto.name,
                unit: dto.unit,
                type: dto.type,
                barcode: dto.barcode,
                price: dto.price,
                photo: dto.photo,
                category: dto.category,
                comment: dto.comment
            };
            
            MOCK_ITEMS.unshift(newItem); // Add to mock DB
            await this.fetchItems(); // Refetch
            return true;
        } catch (e) {
            this.error = 'Failed to create item';
            return false;
        } finally {
            this.isLoading = false;
        }
    },
    
    async updateItem(id: number | string, dto: CreateNomenclatureDto) {
        this.isLoading = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = MOCK_ITEMS.findIndex(i => i.id == id);
            
            // Ensure item exists before updating
            if (index !== -1 && MOCK_ITEMS[index]) {
                MOCK_ITEMS[index] = { 
                    id: MOCK_ITEMS[index].id,
                    name: dto.name,
                    unit: dto.unit,
                    type: dto.type,
                    barcode: dto.barcode,
                    price: dto.price,
                    photo: dto.photo,
                    category: dto.category,
                    comment: dto.comment
                };
                await this.fetchItems();
                return true;
            }
            return false;
        } catch (e) {
            this.error = 'Failed to update item';
            return false;
        } finally {
             this.isLoading = false;
        }
    },

    async deleteItem(id: number | string) {
        this.isLoading = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = MOCK_ITEMS.findIndex(i => i.id === id);
            if (index !== -1) {
                MOCK_ITEMS.splice(index, 1);
                await this.fetchItems();
            }
        } catch (e) {
            this.error = 'Failed to delete item';
        } finally {
            this.isLoading = false;
        }
    }
  }
});
