export type WeekDayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const weekDays: { key: WeekDayKey; label: string }[] = [
  { key: 'mon', label: 'Понедельник' },
  { key: 'tue', label: 'Вторник' },
  { key: 'wed', label: 'Среда' },
  { key: 'thu', label: 'Четверг' },
  { key: 'fri', label: 'Пятница' },
  { key: 'sat', label: 'Суббота' },
  { key: 'sun', label: 'Воскресенье' },
];

export const scheduleTypes = [
  { value: 'shift', label: 'Сменный' },
  { value: 'fixed', label: 'Постоянный' },
  { value: 'night', label: 'Ночная смена' },
  { value: 'flexible', label: 'Гибкий график' },
];
