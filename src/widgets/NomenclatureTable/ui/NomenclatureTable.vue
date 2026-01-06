<script setup lang="ts">
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import { Image as IconImage } from 'lucide-vue-next';
import { AppBadge } from '@/shared/ui/AppBadge';
import { AppAvatar } from '@/shared/ui/AppAvatar';
import type { Nomenclature } from '@/entities/Nomenclature';

interface Props {
  items: Nomenclature[];
  isLoading: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const headers = [
  { key: 'photo', label: 'Фото', width: '80px', align: 'center' as const },
  { key: 'name', label: 'Имя', align: 'center' as const },
  { key: 'unit', label: 'Единица', width: '100px', align: 'center' as const },
  { key: 'type', label: 'Тип', width: '120px', align: 'center' as const },
  { key: 'barcode', label: 'Barcode', width: '150px', align: 'center' as const },
  { key: 'actions', label: 'Действия', align: 'center' as const },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'Продукт': return 'green';
    case 'Топливо': return 'light-blue';
    default: return 'default';
  }
};
</script>

<template>
  <AppTable 
    :headers="headers" 
    :items="items" 
    :loading="isLoading"
  >
    <template #item-photo="{ item }">
      <div class="flex items-center justify-center">
         <AppAvatar 
           :src="item.photo" 
           :alt="item.name" 
           size="md"
         >
            <IconImage class="w-5 h-5 text-slate-300" />
         </AppAvatar>
      </div>
    </template>

    <template #item-type="{ item }">
      <AppBadge 
        :label="item.type" 
        :variant="getBadgeVariant(item.type)" 
      />
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
