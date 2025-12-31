export interface Kadr {
  id: number | string;
  photo: string;
  name: string;
  position: string;
  birthDate: string;
  cv: string;
  role: 'admin' | 'worker' | 'saler' | 'manager';
  gender: 'мужчина' | 'женщина';
  cvUrl?: string;
}

export interface KadrState {
  employees: Kadr[];
  isLoading: boolean;
  error: string | null;
}
