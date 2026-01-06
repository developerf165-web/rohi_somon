<script setup lang="ts">
/**
 * @widget ExpenseTable
 * @description
 * Виджет таблицы для отображения списка расходов.
 * Разрешает ID складов в их названия через SkladStore.
 */
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import type { Expense } from '@/entities/Expense';
import { useSkladStore } from '@/entities/Sklad';

interface Props {
  items: Expense[];
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const skladStore = useSkladStore();

const getSkladName = (id: number | string) => {
  const sklad = skladStore.items.find((s: any) => s.id == id);
  return sklad ? sklad.name : 'Неизвестно';
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const headers = [
  { key: 'date', label: 'Дата', align: 'center' as const },
  { key: 'fromSklad', label: 'Из склада', align: 'center' as const },
  { key: 'toSklad', label: 'На склад', align: 'center' as const },
  { key: 'price', label: 'Цена', align: 'center' as const },
  { key: 'docNumber', label: 'Номер док.', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="items" :loading="isLoading">
    <!-- Из склада -->
    <template #item-fromSklad="{ item }">
      <span class="text-[#1B3E69] font-medium">
        {{ getSkladName(item.fromSkladId) }}
      </span>
    </template>

    <!-- На склад -->
    <template #item-toSklad="{ item }">
      <span class="text-[#1B3E69]">
        {{ getSkladName(item.toSkladId) }}
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
