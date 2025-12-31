import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Kadr } from './types';

export interface KadrFilters {
  search: string;
  positions: string[];
  roles: string[];
  cvStatus: 'all' | 'has' | 'none';
  genders: string[];
}

export const useKadrStore = defineStore('kadr', () => {
  const employees = ref<Kadr[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const filters = ref<KadrFilters>({
    search: '',
    positions: [],
    roles: [],
    cvStatus: 'all',
    genders: [],
  });

  const filteredEmployees = computed(() => {
    let result = employees.value;

    if (filters.value.search) {
      const query = filters.value.search.toLowerCase();
      result = result.filter((emp) => 
        emp.name.toLowerCase().includes(query) || 
        emp.position.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query)
      );
    }

    if (filters.value.positions.length > 0) {
      result = result.filter((emp) => filters.value.positions.includes(emp.position));
    }

    if (filters.value.roles.length > 0) {
      result = result.filter((emp) => filters.value.roles.includes(emp.role));
    }

    if (filters.value.cvStatus !== 'all') {
      result = result.filter((emp) => {
        if (filters.value.cvStatus === 'has') return !!emp.cvUrl;
        if (filters.value.cvStatus === 'none') return !emp.cvUrl;
        return true;
      });
    }

    if (filters.value.genders.length > 0) {
      result = result.filter((emp) => filters.value.genders.includes(emp.gender));
    }

    return result;
  });

  const fetchEmployees = async () => {
    isLoading.value = true;
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      employees.value = [
        {
          id: 1,
          photo: '',
          name: 'Ашурова Шабнам А.',
          position: 'Работник офиса',
          birthDate: '03.10.2004',
          cv: 'view',
          cvUrl: 'https://example.com/cv.pdf',
          role: 'worker',
          gender: 'женщина'
        },
        {
          id: 2,
          photo: '',
          name: 'Иванов Иван И.',
          position: 'Менеджер',
          birthDate: '15.05.1990',
          cv: 'view',
          role: 'manager',
          gender: 'мужчина'
        },
        {
          id: 3,
          name: 'Шарипов Олим Г.',
          photo: '',
          position: 'Продавец',
          birthDate: '01.12.2001',
          cv: 'view',
          cvUrl: 'https://example.com/cv2.pdf',
          role: 'saler',
          gender: 'мужчина',
        },
        {
          id: 4,
          name: 'Саидов Бахром',
          photo: '',
          position: 'Продавец',
          birthDate: '10.12.1995',
          cv: 'view',
          role: 'saler',
          gender: 'мужчина',
        },
        {
          id: 5,
          name: 'Каримова Мафтуна',
          photo: '',
          position: 'Менеджер',
          birthDate: '05.08.1998',
          cv: 'view',
          cvUrl: 'https://example.com/cv3.pdf',
          role: 'manager',
          gender: 'женщина',
        },
        {
          id: 6,
          name: 'Зоиров Али',
          photo: '',
          position: 'Работник офиса',
          birthDate: '12.02.2000',
          cv: 'view',
          role: 'worker',
          gender: 'мужчина',
        },
        {
          id: 7,
          name: 'Умаров Фарход',
          photo: '',
          position: 'Администратор',
          birthDate: '30.11.1988',
          cv: 'view',
          role: 'admin',
          gender: 'мужчина'
        }
      ];
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const removeEmployee = (id: number | string) => {
    employees.value = employees.value.filter(emp => emp.id !== id);
  };

  const resetFilters = () => {
    filters.value = {
      search: '',
      positions: [],
      roles: [],
      cvStatus: 'all',
      genders: [],
    };
  };

  return {
    employees,
    isLoading,
    error,
    filters,
    filteredEmployees,
    fetchEmployees,
    removeEmployee,
    resetFilters,
  };
});
