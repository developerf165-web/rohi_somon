import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Vacation } from './types';

export const useVacationStore = defineStore('vacation', () => {
  const vacations = ref<Vacation[]>([
    {
      id: 1,
      photo: 'https://i.pravatar.cc/150?img=1',
      fio: 'Ашурова Шабнам А.',
      from: '03.10.2024',
      to: '10.10.2024',
      type: 'Отгул',
    },
    {
      id: 2,
      photo: 'https://i.pravatar.cc/150?img=2',
      fio: 'Каримов Рустам Б.',
      from: '15.11.2024',
      to: '30.11.2024',
      type: 'Отпуск',
    },
    {
      id: 3,
      photo: 'https://i.pravatar.cc/150?img=3',
      fio: 'Салимова Нигина В.',
      from: '01.12.2024',
      to: '05.12.2024',
      type: 'Больничный',
    },
    // Duplicate data to fill the table for demo
    {
      id: 4,
      photo: 'https://i.pravatar.cc/150?img=1',
      fio: 'Ашурова Шабнам А.',
      from: '03.10.2024',
      to: '03.10.2024',
      type: 'Отгул',
    },
    {
      id: 5,
      photo: 'https://i.pravatar.cc/150?img=1',
      fio: 'Ашурова Шабнам А.',
      from: '03.10.2024',
      to: '03.10.2024',
      type: 'Отпуск',
    },
    {
      id: 6,
      photo: 'https://i.pravatar.cc/150?img=1',
      fio: 'Ашурова Шабнам А.',
      from: '03.10.2024',
      to: '03.10.2024',
      type: 'Отгул',
    },
  ]);

  const searchQuery = ref('');
  const filters = ref({
    page: 1,
    limit: 10,
  });

  const allVacations = computed(() => {
    let result = vacations.value;
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(v => v.fio.toLowerCase().includes(query));
    }
    return result;
  });

  const filteredVacations = computed(() => {
    const start = (filters.value.page - 1) * filters.value.limit;
    const end = start + filters.value.limit;
    return allVacations.value.slice(start, end);
  });

  const totalVacations = computed(() => allVacations.value.length);

  const removeVacation = (id: number) => {
    vacations.value = vacations.value.filter(v => v.id !== id);
  };

  const addVacation = (vacation: Vacation) => {
    vacations.value.push(vacation);
  };

  const updateVacation = (vacation: Vacation) => {
    const index = vacations.value.findIndex(v => v.id === vacation.id);
    if (index !== -1) {
      vacations.value[index] = vacation;
    }
  };

  return {
    vacations,
    searchQuery,
    filters,
    filteredVacations,
    totalVacations,
    removeVacation,
    addVacation,
    updateVacation,
  };
});
