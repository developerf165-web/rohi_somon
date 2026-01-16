/**
 * Константаҳо барои Номенклатура
 * Constants for Nomenclature entity
 */

export const NOMENCLATURE_TYPES = [
  { label: 'Продукт', value: 'Продукт' },
  { label: 'Топливо', value: 'Топливо' }
];

export const UNIT_OPTIONS = [
  { label: 'кг', value: 'кг' },
  { label: 'литр', value: 'литр' },
  { label: 'шт', value: 'шт' },
  { label: 'м³', value: 'м³' }
];

export type NomenclatureType = 'Продукт' | 'Топливо';
export type UnitType = 'кг' | 'литр' | 'шт' | 'м³';
