<script setup lang="ts">
import type { Schedule } from '@/entities/Schedule';
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import { AppCheckbox } from '@/shared/ui/checkbox';

interface Props {
  schedules: Schedule[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const headers = [
  { key: 'index', label: '#', align: 'center' as const, width: 'w-16' },
  { key: 'fio', label: 'ФИО', align: 'left' as const },
  { key: 'mon', label: 'Пн', align: 'center' as const },
  { key: 'tue', label: 'Вт', align: 'center' as const },
  { key: 'wed', label: 'Ср', align: 'center' as const },
  { key: 'thu', label: 'Чт', align: 'center' as const },
  { key: 'fri', label: 'Пт', align: 'center' as const },
  { key: 'sat', label: 'Сб', align: 'center' as const },
  { key: 'sun', label: 'Вс', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="schedules" :selectable="false">
    <template #item-index="{ item }">
      <span class="text-[#3F5575] font-semibold text-[14px]">
        {{ schedules.indexOf(item) + 1 }}
      </span>
    </template>

    <template #item-fio="{ item }">
      <span class="text-[#3F5575] font-['Manrope'] font-semibold text-[14px]">
        {{ item.fio }}
      </span>
    </template>

    <template #item-mon="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.mon.active" readonly />
      </div>
    </template>

    <template #item-tue="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.tue.active" readonly />
      </div>
    </template>

    <template #item-wed="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.wed.active" readonly />
      </div>
    </template>

    <template #item-thu="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.thu.active" readonly />
      </div>
    </template>

    <template #item-fri="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.fri.active" readonly />
      </div>
    </template>

    <template #item-sat="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.sat.active" readonly />
      </div>
    </template>

    <template #item-sun="{ item }">
      <div class="flex justify-center">
        <AppCheckbox :model-value="item.schedule.sun.active" readonly />
      </div>
    </template>

    <template #item-actions="{ item }">
      <div class="flex items-center justify-center">
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
