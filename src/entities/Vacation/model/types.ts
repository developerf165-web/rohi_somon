export interface Vacation {
  id: number;
  photo: string;
  fio: string;
  from: string;
  to: string;
  type: 'Отпуск' | 'Отгул' | 'Больничный';
}
