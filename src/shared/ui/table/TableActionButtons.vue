<script setup lang="ts">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
    <button 
      v-if="showEdit"
      @click.stop="console.log('Edit clicked', id); emit('edit', id)" 
      class="w-9 h-9 flex items-center justify-center rounded-[4px] border border-[#C6D6E8] text-[#2B6CB0] hover:bg-[#BEE3F8]/20 bg-white shadow-sm transition-colors"
      title="Редактировать"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </button>
    <button 
      v-if="showDelete"
      @click.stop="console.log('Delete clicked', id); emit('delete', id)" 
      class="w-9 h-9 flex items-center justify-center rounded-[4px] border border-[#C6D6E8] text-[#E53E3E] hover:bg-[#FED7D7]/20 bg-white shadow-sm transition-colors"
      title="Удалить"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
    <slot name="extra"></slot>
  </div>
</template>
