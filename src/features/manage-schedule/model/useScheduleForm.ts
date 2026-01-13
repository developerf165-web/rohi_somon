import { reactive } from 'vue';
import { useScheduleStore } from '@/entities/Schedule';
import { weekDays, type WeekDayKey } from '@/entities/Schedule/model/constants';

export function useScheduleForm() {
  const store = useScheduleStore();

  const schedule = reactive<Record<WeekDayKey, { active: boolean; intervals: { start: string; end: string }[] }>>({
    mon: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    tue: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    wed: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    thu: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    fri: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    sat: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
    sun: { active: false, intervals: [{ start: '08:00', end: '17:00' }] },
  });

  const loadSchedule = (id: number) => {
    const existingSchedule = store.getScheduleById(id);
    if (existingSchedule) {
      // Deep copy to avoid mutating store directly
      Object.assign(schedule, JSON.parse(JSON.stringify(existingSchedule.schedule)));
      return existingSchedule;
    }
    return null;
  };

  const onDayActiveChange = (key: WeekDayKey, isActive: boolean) => {
    schedule[key].active = isActive;
    if (isActive && schedule[key].intervals.length === 0) {
       schedule[key].intervals.push({ start: '08:00', end: '17:00' });
    }
  };

  const addInterval = (key: WeekDayKey) => {
    schedule[key].intervals.push({ start: '08:00', end: '17:00' });
  };

  const removeInterval = (key: WeekDayKey, index: number) => {
    schedule[key].intervals.splice(index, 1);
    if (schedule[key].intervals.length === 0) {
      schedule[key].active = false;
    }
  };

  const copyToAllDays = (sourceKey: WeekDayKey) => {
    const sourceIntervals = JSON.parse(JSON.stringify(schedule[sourceKey].intervals));
    
    weekDays.forEach(day => {
      if (day.key !== sourceKey) {
        schedule[day.key].active = true;
        schedule[day.key].intervals = JSON.parse(JSON.stringify(sourceIntervals));
      }
    });
  };

  const validateSchedule = (selectedType: string | null): boolean => {
    for (const day of weekDays) {
      const dayData = schedule[day.key];
      if (dayData.active) {
        // 1. Check Start < End (unless Night Shift)
        const isNight = selectedType === 'night';
        
        for (const interval of dayData.intervals) {
          if (!interval.start || !interval.end) {
            alert(`Заполните все поля времени для: ${day.label}`);
            return false;
          }
          if (!isNight && interval.start >= interval.end) {
            alert(`Время начала должно быть меньше времени конца для: ${day.label} (${interval.start} - ${interval.end})`);
            return false;
          }
        }
  
        // 2. Check Overlaps
        if (dayData.intervals.length > 1) {
          const sorted = [...dayData.intervals].sort((a, b) => a.start.localeCompare(b.start));
          for (let i = 1; i < sorted.length; i++) {
            const prev = sorted[i-1];
            const curr = sorted[i];
            
            if (prev && curr && !isNight && curr.start < prev.end) {
               alert(`Пересечение интервалов для: ${day.label}`);
               return false;
            }
          }
        }
      }
    }
    return true;
  };

  return {
    schedule,
    loadSchedule,
    onDayActiveChange,
    addInterval,
    removeInterval,
    copyToAllDays,
    validateSchedule
  };
}
