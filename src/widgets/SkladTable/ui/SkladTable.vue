<script setup lang="ts">
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import type { Sklad } from '@/entities/Sklad';
import { usePointStore } from '@/entities/Point';

interface Props {
  items: Sklad[];
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const pointStore = usePointStore();

const getPointName = (pointId: number | string) => {
    const point = pointStore.points.find(p => p.id == pointId);
    return point ? point.title : 'Неизвестно';
};

const getTypeClass = (type: Sklad['type']) => {
    switch (type) {
        case 'Магазин': return 'bg-[#D9F99D] text-[#4D7C0F]';
        case 'GSM': return 'bg-[#BEE3F8] text-[#2B6CB0]';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const headers = [
  { key: 'name', label: 'Имя', align: 'center' as const },
  { key: 'point', label: 'Точка', align: 'center' as const },
  { key: 'type', label: 'Тип', align: 'center' as const },
  { key: 'createdAt', label: 'Дата создания', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];
</script>

<template>
  <AppTable :headers="headers" :items="items" :loading="isLoading">
    <template #item-point="{ item }">
      {{ getPointName(item.pointId) }}
    </template>

    <template #item-type="{ item }">
       <span :class="['px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider', getTypeClass(item.type)]">
         {{ item.type }}
       </span>
    </template>

    <template #item-createdAt="{ item }">
       <span class="text-[#8DA2C0]">
         {{ item.createdAt }}
       </span>
    </template>

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
