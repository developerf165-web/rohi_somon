<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: number; // Current page
  total: number;
  limit: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void;
  (e: 'update:limit', limit: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.limit));

const pages = computed(() => {
  const current = props.modelValue;
  const count = totalPages.value;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= count; i++) {
    if (i == 1 || i == count || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
});

const displayedLimit = computed({
  get: () => props.limit,
  set: (val) => emit('update:limit', val)
});

const limits = [10, 20, 50, 100];
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <!-- Page Size -->
    <div class="flex items-center">
      <div class="relative">
        <select 
          v-model="displayedLimit"
          class="appearance-none bg-white border border-[#C6D6E8] rounded-md px-4 py-2 pr-8 text-[#3F5575] font-['Manrope'] font-medium text-sm focus:outline-none focus:border-[#127EEE] cursor-pointer min-w-[140px]"
        >
          <option v-for="l in limits" :key="l" :value="l">{{ l }} на странице</option>
        </select>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#3F5575]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center gap-1.5">
      <!-- Previous -->
      <button 
        class="flex items-center gap-2 px-3 py-2 rounded-md border border-[#C6D6E8] bg-white text-[#3F5575] font-['Manrope'] font-medium text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="modelValue <= 1"
        @click="emit('update:modelValue', modelValue - 1)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Назад</span>
      </button>

      <!-- Pages -->
      <template v-for="(page, index) in pages" :key="index">
        <span 
          v-if="page === '...'"
          class="w-9 h-9 flex items-center justify-center text-[#3F5575] font-['Manrope'] font-medium"
        >
          ...
        </span>
        <button 
          v-else
          class="w-9 h-9 flex items-center justify-center rounded-md font-['Manrope'] font-medium text-sm transition-colors border"
          :class="page === modelValue 
            ? 'bg-[#1B3E69] text-white border-[#1B3E69]' 
            : 'bg-white text-[#3F5575] border-[#C6D6E8] hover:bg-gray-50'"
          @click="emit('update:modelValue', Number(page))"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button 
        class="flex items-center gap-2 px-3 py-2 rounded-md border border-[#C6D6E8] bg-white text-[#3F5575] font-['Manrope'] font-medium text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="modelValue >= totalPages"
        @click="emit('update:modelValue', modelValue + 1)"
      >
        <span>След</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>
