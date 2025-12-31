<script setup lang="ts">
import type { Kadr } from '@/entities/Kadr';
import KadrTableRow from './KadrTableRow.vue';
import { AppTable } from '@/shared/ui/table';

interface Props {
  employees: Kadr[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
  (e: 'cv-click', id: number | string): void;
}>();

const headers = [
  { key: 'photo', label: 'Фото', align: 'center' as const },
  { key: 'name', label: 'ФИО', align: 'center' as const },
  { key: 'position', label: 'Должность', align: 'center' as const },
  { key: 'birthDate', label: 'Дата рождения', align: 'center' as const },
  { key: 'cv', label: 'CV', align: 'center' as const },
  { key: 'role', label: 'Роль', align: 'center' as const },
  { key: 'gender', label: 'Пол', align: 'center' as const },
  { key: 'actions', label: '', align: 'center' as const }, // Actions column
];
</script>

<template>
  <AppTable :headers="headers" :items="employees">
    <template #default>
      <KadrTableRow 
        v-for="emp in employees" 
        :key="emp.id" 
        :employee="emp"
        @view="id => emit('view', id)"
        @edit="id => emit('edit', id)"
        @delete="id => emit('delete', id)"
        @cv-click="id => emit('cv-click', id)"
      />
    </template>
  </AppTable>
</template>
