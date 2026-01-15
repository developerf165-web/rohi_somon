export type SupplierType = 'transport' | 'company';

export interface Supplier {
  id: number | string;
  name: string;
  type: SupplierType;
  photo?: string;
  phoneNumber?: string;
  address?: string;
  comment?: string;
}
