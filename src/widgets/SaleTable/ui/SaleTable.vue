<script setup lang="ts">
import type { Sale } from '@/entities/Sale';
import { AppTable } from '@/shared/ui/table';
import { AppBadge } from '@/shared/ui/AppBadge';

interface Props {
  items: Sale[];
  isLoading?: boolean;
}

defineProps<Props>();

const headers = [
  { key: 'pointName', label: 'Точка', align: 'center' as const },
  { key: 'cashboxName', label: 'Касса', align: 'center' as const },
  { key: 'date', label: 'Дата', align: 'center' as const },
  { key: 'amount', label: 'Сумма', align: 'center' as const },
  { key: 'type', label: 'Тип', align: 'center' as const },
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
    <!-- Custom slot for pointName -->
    <template #item-pointName="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.pointName }}
      </div>
    </template>

    <!-- Custom slot for cashboxName -->
    <template #item-cashboxName="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.cashboxName }}
      </div>
    </template>

    <!-- Custom slot for date -->
    <template #item-date="{ item }">
      <div class="text-center text-[#3F5575] text-[14px]">
        {{ item.date }}
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

    <!-- Custom slot for type -->
    <template #item-type="{ item }">
      <div class="flex justify-center">
        <AppBadge 
          :label="item.type"
          :variant="item.type === 'Без нал.' ? 'green' : 'light-blue'"
          class="min-w-[100px]"
        />
      </div>
    </template>
  </AppTable>
</template>
