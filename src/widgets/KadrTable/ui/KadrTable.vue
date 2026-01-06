<script setup lang="ts">
import { IconCV } from '@/shared/assets/icons';
import type { Kadr } from '@/entities/Kadr';
import { AppTable, TableActionButtons } from '@/shared/ui/table';
import { AppBadge } from '@/shared/ui/AppBadge';
import { AppAvatar } from '@/shared/ui/AppAvatar';

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

const getRoleVariant = (role: Kadr['role']) => {
  switch (role) {
    case 'admin': return 'light-blue';
    case 'worker': return 'green';
    case 'saler': return 'purple';
    case 'manager': return 'indigo';
    default: return 'default';
  }
};

const headers = [
  { key: 'photo', label: 'Фото', align: 'center' as const, width: 'w-16' },
  { key: 'name', label: 'ФИО', align: 'center' as const },
  { key: 'position', label: 'Должность', align: 'center' as const },
  { key: 'birthDate', label: 'Дата рождения', align: 'center' as const },
  { key: 'cv', label: 'CV', align: 'center' as const },
  { key: 'role', label: 'Роль', align: 'center' as const },
  { key: 'gender_actions', label: 'Пол / Действия', align: 'center' as const, width: 'min-w-[140px]' }, 
];
</script>

<template>
  <AppTable :headers="headers" :items="employees">
    <template #item-photo="{ item }">
      <div class="flex justify-center">
        <AppAvatar 
          :src="item.photo" 
          :alt="item.name" 
          size="md"
        />
      </div>
    </template>

    <template #item-cv="{ item }">
      <div class="flex justify-center">
        <button 
          class="inline-flex items-center transition-opacity hover:opacity-100"
          :class="item.cvUrl ? 'opacity-100' : 'opacity-30'"
          @click="item.cvUrl && emit('cv-click', item.id)"
        >
          <IconCV />
        </button>
      </div>
    </template>

    <template #item-role="{ item }">
      <div class="flex justify-center">
        <AppBadge 
            :label="item.role" 
            :variant="getRoleVariant(item.role)" 
        />
      </div>
    </template>

    <template #item-gender_actions="{ item }">
       <div class="relative h-9 flex items-center justify-center">
        <span class="font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575] group-hover:invisible">
          {{ item.gender }}
        </span>
        <div class="absolute inset-0 invisible group-hover:visible flex items-center justify-center">
          <TableActionButtons 
            :id="item.id"
            @view="id => emit('view', id)"
            @edit="id => emit('edit', id)"
            @delete="id => emit('delete', id)"
          />
        </div>
      </div>
    </template>
  </AppTable>
</template>
