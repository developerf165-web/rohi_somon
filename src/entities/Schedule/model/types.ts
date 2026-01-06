export interface Schedule {
  id: number;
  employeeId: number;
  fio: string; // Employee full name
  schedule: {
    mon: { active: boolean; intervals: { start: string; end: string }[] };
    tue: { active: boolean; intervals: { start: string; end: string }[] };
    wed: { active: boolean; intervals: { start: string; end: string }[] };
    thu: { active: boolean; intervals: { start: string; end: string }[] };
    fri: { active: boolean; intervals: { start: string; end: string }[] };
    sat: { active: boolean; intervals: { start: string; end: string }[] };
    sun: { active: boolean; intervals: { start: string; end: string }[] };
  };
}
