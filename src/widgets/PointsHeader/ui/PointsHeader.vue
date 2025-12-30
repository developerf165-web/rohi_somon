<script setup lang="ts">
import { IconSearch } from '@/shared/assets/icons';
import AppButton from '@/shared/ui/button/AppButton.vue';

defineProps<{
  searchModel: string;
}>();

const emit = defineEmits<{
  (e: 'update:searchModel', value: string): void;
  (e: 'add'): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <!-- Title -->
    <h1 class="text-[30px] font-bold text-[#1B3E69] leading-none">
      Точки
    </h1>

    <!-- Actions Bar -->
    <div class="flex items-center justify-between h-[60px] px-[10px] bg-[#DFE8F56B] rounded-[4px] w-full">
      <!-- Search Input -->
      <div class="relative flex items-center w-[425px]">
        <IconSearch class="absolute left-3 text-[#9AA6AC] w-[18px] h-[18px]" />
        <input
          type="text"
          :value="searchModel"
          placeholder="Поиск по имени"
          class="w-full h-10 pl-10 pr-3 bg-white border border-[#DDE2E4] rounded-[4px] text-sm outline-none placeholder:text-[#9AA6AC] focus:border-[#1B3E69] transition-colors"
          @input="(e) => emit('update:searchModel', (e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Add Button -->
      <AppButton
        variant="primary"
        class="w-[120px] h-11 text-[16px] font-semibold text-[#EFFFEF]"
        @click="emit('add')"
      >
        Добавить
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
h1 {
  letter-spacing: -0.02em;
}
</style>
