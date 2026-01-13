<script setup lang="ts">
import type { Encashment } from '@/entities/Encashment';
import { AppTable } from '@/shared/ui/table';
import { AppBadge } from '@/shared/ui/AppBadge';

interface Props {
  items: Encashment[];
  isLoading?: boolean;
}

defineProps<Props>();

const headers = [
  { key: 'fromCashbox', label: 'От касса', align: 'center' as const },
  { key: 'toCashbox', label: 'На кассу', align: 'center' as const },
  { key: 'encashmentOfficer', label: 'Инкасатор', align: 'center' as const },
  { key: 'amount', label: 'Сумма', align: 'center' as const },
  { key: 'date', label: 'Дата', align: 'center' as const },
  { key: 'shift', label: 'Смена', align: 'center' as const },
  { key: 'status', label: 'Статус', align: 'center' as const },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const getStatusVariant = (status: Encashment['status']) => {
  switch (status) {
    case 'Успешно': return 'green';
    case 'Отмена': return 'red';
    case 'В пути':
    default: return 'light-blue';
  }
};
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
    :is-loading="isLoading"
    :selectable="true"
  >
    <!-- Custom slot for fromCashbox -->
    <template #item-fromCashbox="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.fromCashbox }}
      </div>
    </template>

    <!-- Custom slot for toCashbox -->
    <template #item-toCashbox="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.toCashbox }}
      </div>
    </template>

    <!-- Custom slot for encashmentOfficer -->
    <template #item-encashmentOfficer="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.encashmentOfficer }}
      </div>
    </template>

    <!-- Custom slot for amount -->
    <template #item-amount="{ item }">
      <div class="text-center">
        <span class="text-[#3F5575] font-semibold text-[14px]">
          {{ formatCurrency(item.amount) }}
        </span>
      </div>
    </template>

    <!-- Custom slot for date -->
    <template #item-date="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.date }}
      </div>
    </template>

    <!-- Custom slot for shift -->
    <template #item-shift="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.shift }}
      </div>
    </template>

    <!-- Custom slot for status -->
    <template #item-status="{ item }">
      <div class="flex justify-center">
        <AppBadge 
          :label="item.status"
          :variant="getStatusVariant(item.status)"
          class="min-w-[100px]"
        />
      </div>
    </template>
  </AppTable>
</template>
