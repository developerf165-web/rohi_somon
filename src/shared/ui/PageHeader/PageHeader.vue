<script setup lang="ts">
import { IconSearch } from '@/shared/assets/icons';
import { AppButton } from '@/shared/ui/button';

interface Props {
  title: string;
  placeholder?: string;
  showFilter?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Поиск...',
  showFilter: false,
});

const search = defineModel<string>('search', { default: '' });

defineEmits<{
  (e: 'add'): void;
  (e: 'filter'): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <!-- Title -->
    <h1 class="text-[32px] font-bold text-[#1B3E69] leading-none">
      {{ title }}
    </h1>

    <!-- Actions Bar -->
    <div class="flex items-center justify-between h-[60px] px-[10px] bg-[#DFE8F56B] rounded-[4px] w-full">
      <!-- Search Input -->
      <div class="relative flex items-center w-[425px]">
        <IconSearch class="absolute left-3 text-[#9AA6AC] w-[18px] h-[18px]" />
        <input
          v-model="search"
          type="text"
          :placeholder="placeholder"
          class="w-full h-10 pl-10 pr-3 bg-white border border-[#DDE2E4] rounded-[4px] text-sm outline-none placeholder:text-[#9AA6AC] focus:border-[#1B3E69] transition-colors"
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <slot name="extra-actions"></slot>
        
        <AppButton
          v-if="showFilter"
          variant="secondary"
          class="h-11 px-8 text-[16px] font-semibold"
          @click="$emit('filter')"
        >
          Фильтр
        </AppButton>
        
        <AppButton
          variant="primary"
          class="min-w-[120px] h-11 px-6 text-[16px] font-semibold text-[#EFFFEF]"
          @click="$emit('add')"
        >
          Добавить
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  letter-spacing: -0.02em;
}
</style>
