import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Schedule } from './types';

export const useScheduleStore = defineStore('schedule', () => {
  // Helper to create default day
  const defaultDay = (active: boolean) => ({
    active,
    intervals: active ? [{ start: '08:00', end: '17:00' }] : []
  });

  const schedules = ref<Schedule[]>([
    {
      id: 1,
      employeeId: 101,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { 
        mon: defaultDay(true), 
        tue: defaultDay(false), 
        wed: defaultDay(true), 
        thu: defaultDay(false), 
        fri: defaultDay(true), 
        sat: defaultDay(false), 
        sun: defaultDay(false)
      }
    },
    {
      id: 2,
      employeeId: 102,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { 
        mon: defaultDay(false), 
        tue: defaultDay(true), 
        wed: defaultDay(true), 
        thu: defaultDay(true), 
        fri: defaultDay(true), 
        sat: defaultDay(false), 
        sun: defaultDay(true)
      }
    },
    // ... keep other items similar or just reduce mock data for brevity
  ]);

  const searchQuery = ref('');
  const filters = ref({
    page: 1,
    limit: 10,
  });

  const filteredSchedules = computed(() => {
    let result = schedules.value;

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(s => 
        s.fio.toLowerCase().includes(query)
      );
    }
    
    return result;
  });

  const totalSchedules = computed(() => schedules.value.length);

  const getScheduleById = (id: number) => {
    return schedules.value.find(s => s.id === id);
  };

  const addSchedule = (schedule: Schedule) => {
    // Generate simple ID
    schedule.id = Math.max(...schedules.value.map(s => s.id), 0) + 1;
    schedules.value.push(schedule);
  };

  const updateSchedule = (schedule: Schedule) => {
    const index = schedules.value.findIndex(s => s.id === schedule.id);
    if (index !== -1) {
      schedules.value[index] = schedule;
    }
  };

  const removeSchedule = (id: number) => {
    schedules.value = schedules.value.filter(s => s.id !== id);
  };

  return {
    schedules,
    searchQuery,
    filters,
    filteredSchedules,
    totalSchedules,
    getScheduleById,
    addSchedule,
    updateSchedule,
    removeSchedule,
  };
});
