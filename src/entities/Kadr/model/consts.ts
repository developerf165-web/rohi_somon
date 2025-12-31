export const KADR_ROLES = {
  ADMIN: 'admin',
  WORKER: 'worker',
  SALER: 'saler',
  MANAGER: 'manager',
} as const;

export const KADR_GENDERS = {
  MALE: 'мужчина',
  FEMALE: 'женщина',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  [KADR_ROLES.ADMIN]: 'Администратор',
  [KADR_ROLES.WORKER]: 'Работник',
  [KADR_ROLES.SALER]: 'Продавец',
  [KADR_ROLES.MANAGER]: 'Менеджер',
};
