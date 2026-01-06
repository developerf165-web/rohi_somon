<script setup lang="ts">
import type { Vacation } from '@/entities/Vacation';
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import { AppBadge } from '@/shared/ui/AppBadge';
import { AppAvatar } from '@/shared/ui/AppAvatar';

interface Props {
  vacations: Vacation[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const getBadgeVariant = (type: Vacation['type']) => {
  switch (type) {
    case 'Отпуск': return 'blue';
    case 'Отгул': return 'dark';
    case 'Больничный': return 'red';
    default: return 'default';
  }
};

const headers = [
  { key: 'photo', label: 'Фото', align: 'center' as const, width: 'w-16' },
  { key: 'fio', label: 'ФИО', align: 'center' as const },
  { key: 'from', label: 'От', align: 'center' as const },
  { key: 'to', label: 'До', align: 'center' as const },
  { key: 'type', label: 'Тип', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="vacations">
    <template #item-photo="{ item }">
      <div class="flex justify-center">
        <AppAvatar 
          :src="item.photo" 
          :alt="item.fio" 
          size="md"
        />
      </div>
    </template>

    <template #item-type="{ item }">
      <div class="flex justify-center">
        <AppBadge 
            :label="item.type" 
            :variant="getBadgeVariant(item.type)" 
        />
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
