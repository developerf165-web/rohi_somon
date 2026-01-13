<script setup lang="ts">
import type { Shift } from '@/entities/Shift';
import { AppTable } from '@/shared/ui/table';

interface Props {
  items: Shift[];
  isLoading?: boolean;
}

defineProps<Props>();

const headers = [
  { key: 'cashboxName', label: 'Касса', align: 'center' as const },
  { key: 'skladName', label: 'Склад', align: 'center' as const },
  { key: 'startTime', label: 'Начало', align: 'center' as const },
  { key: 'endTime', label: 'Конец', align: 'center' as const },
  { key: 'cashierName', label: 'Кассир', align: 'center' as const },
  { key: 'startBalance', label: 'Баланс начало', align: 'center' as const },
  { key: 'endBalance', label: 'Баланс конец', align: 'center' as const },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
</script>

<template>
  <AppTable
    :headers="headers"
    :items="items"
    :is-loading="isLoading"
    :selectable="true"
  >
    <!-- Custom slot for cashboxName -->
    <template #item-cashboxName="{ item }">
      <div class="text-center">
        <span class="text-[#3F5575] font-semibold text-[14px]">
          {{ item.cashboxName }}
        </span>
      </div>
    </template>

    <!-- Custom slot for skladName -->
    <template #item-skladName="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.skladName }}
      </div>
    </template>

    <!-- Custom slot for startTime -->
    <template #item-startTime="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.startTime }}
      </div>
    </template>

    <!-- Custom slot for endTime -->
    <template #item-endTime="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.endTime }}
      </div>
    </template>

    <!-- Custom slot for cashierName -->
    <template #item-cashierName="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.cashierName }}
      </div>
    </template>

    <!-- Custom slot for startBalance -->
    <template #item-startBalance="{ item }">
      <div class="text-center">
        <span class="text-[#3F5575] font-semibold text-[14px]">
          {{ formatCurrency(item.startBalance) }}
        </span>
      </div>
    </template>

    <!-- Custom slot for endBalance -->
    <template #item-endBalance="{ item }">
      <div class="text-center">
        <span class="text-[#3F5575] font-semibold text-[14px]">
          {{ formatCurrency(item.endBalance) }}
        </span>
      </div>
    </template>
  </AppTable>
</template>
