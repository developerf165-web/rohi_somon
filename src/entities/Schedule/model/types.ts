export interface Schedule {
  id: number;
  employeeId: number;
  fio: string; // Employee full name
  schedule: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
}
