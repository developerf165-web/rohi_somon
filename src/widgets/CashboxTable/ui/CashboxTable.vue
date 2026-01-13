<script setup lang="ts">
/**
 * @widget CashboxTable
 * @description
 * Виджет таблицы для отображения списка касс.
 */
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import { AppBadge } from '@/shared/ui/AppBadge';
import type { Cashbox } from '@/entities/Cashbox';

interface Props {
  items: Cashbox[];
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const headers = [
  { key: 'number', label: 'Номер', align: 'center' as const },
  { key: 'sklad', label: 'Склад', align: 'center' as const },
  { key: 'balance', label: 'Баланс', align: 'center' as const },
  { key: 'isMain', label: 'Главный', align: 'center' as const },
  { key: 'description', label: 'Описания', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="items" :loading="isLoading">
    <!-- Номер -->
    <template #item-number="{ item }">
      <span class="text-[#3F5575] font-semibold">
        {{ item.number }}
      </span>
    </template>

    <!-- Склад -->
    <template #item-sklad="{ item }">
      <span class="text-[#3F5575]">
        {{ item.skladName }}
      </span>
    </template>

    <!-- Баланс -->
    <template #item-balance="{ item }">
      <span class="text-[#1B3E69] font-bold">
        {{ formatPrice(item.balance) }}
      </span>
    </template>

    <!-- Главный (Main) -->
    <template #item-isMain="{ item }">
      <AppBadge 
        :label="item.isMain ? 'Да' : 'Нет'" 
        :variant="item.isMain ? 'green' : 'default'"
        class="min-w-[70px]"
      />
    </template>

    <!-- Описания -->
    <template #item-description="{ item }">
      <span class="text-[#3F5575]">
        {{ item.description }}
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
