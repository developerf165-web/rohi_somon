<script setup lang="ts">
import { IconView, IconEdit, IconDelete } from '@/shared/assets/icons';

interface Props {
  id: number | string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

withDefaults(defineProps<Props>(), {
  showView: true,
  showEdit: true,
  showDelete: true,
});

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();
</script>

<template>
  <div class="flex items-center gap-2 justify-center">
    <button 
      v-if="showView"
      @click.stop="console.log('View clicked', id); emit('view', id)" 
      class="w-9 h-9 flex items-center justify-center rounded-[4px] border border-[#C6D6E8] text-[#6A9A1F] hover:bg-[#E2F9B8]/20 bg-white shadow-sm transition-colors"
      title="Посмотреть"
    >
      <IconView class="w-5 h-5" />
    </button>
    <button 
      v-if="showEdit"
      @click.stop="console.log('Edit clicked', id); emit('edit', id)" 
      class="w-9 h-9 flex items-center justify-center rounded-[4px] border border-[#C6D6E8] text-[#2B6CB0] hover:bg-[#BEE3F8]/20 bg-white shadow-sm transition-colors"
      title="Редактировать"
    >
      <IconEdit class="w-5 h-5" />
    </button>
    <button 
      v-if="showDelete"
      @click.stop="console.log('Delete clicked', id); emit('delete', id)" 
      class="w-9 h-9 flex items-center justify-center rounded-[4px] border border-[#C6D6E8] text-[#E53E3E] hover:bg-[#FED7D7]/20 bg-white shadow-sm transition-colors"
      title="Удалить"
    >
      <IconDelete class="w-5 h-5" />
    </button>
    <slot name="extra"></slot>
  </div>
</template>
