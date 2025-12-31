<script setup lang="ts">
import type { Schedule } from '@/entities/Schedule';
import SchedulesTableRow from './SchedulesTableRow.vue';
import { AppTable } from '@/shared/ui/table';

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
    <template #default>
      <SchedulesTableRow 
        v-for="(item, index) in schedules" 
        :key="item.id" 
        :schedule="item"
        :index="index"
        @view="id => emit('view', id)"
        @edit="id => emit('edit', id)"
        @delete="id => emit('delete', id)"
      />
    </template>
  </AppTable>
</template>
