import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Supplier } from './types';

/**
 * Store барои идоракунии таъминкунандагон (Suppliers).
 * Риояи "Store Contract": 
 * Ҳамеша items, fetchItems, createItem ва updateItem-ро барои мувофиқат бо useEntityForm истифода мебарад.
 */
export const useSupplierStore = defineStore('supplier', () => {
    const suppliers = ref<Supplier[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const filters = ref({
        search: '',
    });

    const filteredSuppliers = computed(() => {
        let result = suppliers.value;

        if (filters.value.search) {
            const query = filters.value.search.toLowerCase();
            result = result.filter(s => 
                s.name.toLowerCase().includes(query) || 
                (s.address && s.address.toLowerCase().includes(query)) ||
                (s.phoneNumber && s.phoneNumber.includes(query))
            );
        }

        return result;
    });

    const fetchSuppliers = async () => {
        isLoading.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            // Mock Data based on the image provided
            suppliers.value = [
                {
                    id: 1,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    phoneNumber: '+992 (98 765 44 32)',
                    photo: (await import('@/assets/точки.png')).default,
                    address: ''
                },
                {
                    id: 2,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    phoneNumber: '+992 (98 765 44 32)',
                    photo: (await import('@/assets/точки.png')).default,
                    address: ''
                },
                {
                    id: 3,
                    name: 'OOO RC COLA',
                    type: 'company',
                    address: 'Исмоили Сомони 1176',
                    photo: '', 
                    phoneNumber: ''
                },
                {
                    id: 4,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    phoneNumber: '+992 (98 765 44 32)',
                    photo: (await import('@/assets/точки.png')).default,
                    address: ''
                },
                {
                    id: 5,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    address: '',
                    photo: (await import('@/assets/точки.png')).default,
                    phoneNumber: ''
                },
                {
                    id: 6,
                    name: 'OOO RC COLA',
                    type: 'company',
                    address: '',
                    photo: '',
                    phoneNumber: ''
                },
                {
                    id: 7,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    address: '',
                    photo: (await import('@/assets/точки.png')).default,
                    phoneNumber: ''
                },
                {
                    id: 8,
                    name: 'OOO RC COLA',
                    type: 'transport',
                    address: '',
                    photo: '',
                    phoneNumber: ''
                }
            ];
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteSupplier = async (id: number | string) => {
        isLoading.value = true;
        error.value = null;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            suppliers.value = suppliers.value.filter(s => s.id !== id);
            return true;
        } catch (e: any) {
            error.value = e.message;
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const createItem = async (data: any) => {
        isLoading.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const newItem = {
                id: Math.floor(Math.random() * 10000),
                ...data,
                // If photo is a File object (from upload), handle it vaguely or keep as is for mock
                // In real app, we'd upload and get URL.
                // For mock, we just rely on data.photo being passed if it's a string, or keep placeholder
                photo: data.photo || '' 
            };
            suppliers.value.unshift(newItem);
            return true;
        } catch (e: any) {
            error.value = 'Failed to create supplier';
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const updateItem = async (id: string | number, data: any) => {
        isLoading.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = suppliers.value.findIndex(s => s.id == id);
            if (index !== -1) {
                suppliers.value[index] = { ...suppliers.value[index], ...data };
                return true;
            }
            return false;
        } catch (e: any) {
            error.value = 'Failed to update supplier';
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    // Aliases for useEntityForm
    const fetchItems = fetchSuppliers;
    const items = suppliers;

    return {
        suppliers,
        isLoading,
        error,
        filters,
        filteredSuppliers,
        fetchSuppliers,
        deleteSupplier,
        createItem,
        updateItem,
        fetchItems,
        items
    };
});
