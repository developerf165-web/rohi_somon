<script setup lang="ts">
import type { Vacation } from '@/entities/Vacation';
import VacationsTableRow from './VacationsTableRow.vue';

import { AppTable } from '@/shared/ui/table';

interface Props {
  vacations: Vacation[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const headers = [
  { key: 'photo', label: 'Фото', align: 'center' as const },
  { key: 'fio', label: 'ФИО', align: 'center' as const },
  { key: 'from', label: 'От', align: 'center' as const },
  { key: 'to', label: 'До', align: 'center' as const },
  { key: 'type', label: 'Тип', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="vacations">
    <template #default>
      <VacationsTableRow 
        v-for="item in vacations" 
        :key="item.id" 
        :vacation="item"
        @view="id => emit('view', id)"
        @edit="id => emit('edit', id)"
        @delete="id => emit('delete', id)"
      />
    </template>
  </AppTable>
</template>
