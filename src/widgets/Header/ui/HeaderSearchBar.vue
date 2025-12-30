<script setup lang="ts">
import { IconSearch } from '@/shared/assets/icons';

defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="relative flex items-center">
    <IconSearch class="absolute left-3 text-[#9AA6AC] w-[18px] h-[18px]" />
    <input
      type="text"
      :value="modelValue"
      placeholder="Поиск"
      class="w-[200px] h-8 pl-10 pr-3 bg-white border border-[#DDE2E4] rounded-md text-sm outline-none placeholder:text-[#9AA6AC] focus:border-[#1B3E69] transition-colors"
      @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
  </div>
</template>
