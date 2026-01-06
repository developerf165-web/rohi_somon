<script setup lang="ts">
/**
 * @widget ArrivalTable
 * @description
 * Компонент таблицы для отображения сущностей "Приход".
 * Автоматически разрешает ID поставщиков и складов в их названия через соответствующие сторы.
 * 
 * @prop {Arrival[]} items - Список приходов для отображения
 * @prop {boolean} isLoading - Флаг состояния загрузки
 */
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import type { Arrival } from '@/entities/Arrival';
import { useSupplierStore } from '@/entities/Supplier';
import { useSkladStore } from '@/entities/Sklad';

interface Props {
  items: Arrival[];
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const supplierStore = useSupplierStore();
const skladStore = useSkladStore();

// Получение имени поставщика
const getSupplierName = (id: number | string) => {
  const supplier = supplierStore.suppliers.find((s: any) => s.id == id);
  return supplier ? supplier.name : 'Неизвестно';
};

// Получение названия склада
const getSkladName = (id: number | string) => {
  const sklad = skladStore.items.find((s: any) => s.id == id);
  return sklad ? sklad.name : 'Неизвестно';
};

// Форматирование цены
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const headers = [
  { key: 'date', label: 'Дата', align: 'center' as const },
  { key: 'supplier', label: 'Поставщик', align: 'center' as const },
  { key: 'sklad', label: 'Склад', align: 'center' as const },
  { key: 'price', label: 'Цена', align: 'center' as const },
  { key: 'docNumber', label: 'Номер док.', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="items" :loading="isLoading">
    <!-- Поставщик -->
    <template #item-supplier="{ item }">
      <span class="text-[#1B3E69] font-medium">
        {{ getSupplierName(item.supplierId) }}
      </span>
    </template>

    <!-- Склад -->
    <template #item-sklad="{ item }">
      <span class="text-[#1B3E69]">
        {{ getSkladName(item.skladId) }}
      </span>
    </template>

    <!-- Цена -->
    <template #item-price="{ item }">
      <span class="text-[#1B3E69] font-semibold">
        {{ formatPrice(item.totalPrice) }}
      </span>
    </template>

    <!-- Действия -->
    <template #item-actions="{ item }">
       <div class="flex justify-center">
        <TableActionButtons 
              :id="item.id"
              @view="id => emit('view', id)"
              @edit="id => emit('edit', id)"
              @delete="id => emit('delete', id)"
        />
       </div>
    </template>
  </AppTable>
</template>
