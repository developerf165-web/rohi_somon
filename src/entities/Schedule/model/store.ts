import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Schedule } from './types';

export const useScheduleStore = defineStore('schedule', () => {
  const schedules = ref<Schedule[]>([
    {
      id: 1,
      employeeId: 101,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: true, tue: false, wed: true, thu: false, fri: true, sat: false, sun: false}
    },
    {
      id: 2,
      employeeId: 102,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: false, tue: true, wed: true, thu: true, fri: true, sat: false, sun: true}
    },
    {
      id: 3,
      employeeId: 103,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: true, tue: false, wed: true, thu: false, fri: true, sat: false, sun: false}
    },
    {
      id: 4,
      employeeId: 104,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: false, tue: true, wed: true, thu: true, fri: true, sat: false, sun: true}
    },
    {
      id: 5,
      employeeId: 105,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: true, tue: false, wed: true, thu: false, fri: true, sat: false, sun: false}
    },
    {
      id: 6,
      employeeId: 106,
      fio: 'Нуриддин Шахобов Фаррухович',
      schedule: { mon: false, tue: true, wed: true, thu: true, fri: true, sat: false, sun: true}
    },
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
    
    // Pagination logic could be added here similar to existing stores

    return result;
  });

  const totalSchedules = computed(() => schedules.value.length);

  const addSchedule = (schedule: Schedule) => {
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
    addSchedule,
    updateSchedule,
    removeSchedule,
  };
});
