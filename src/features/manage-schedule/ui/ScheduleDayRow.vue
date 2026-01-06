<script setup lang="ts">
import { AppCheckbox } from '@/shared/ui/checkbox';
import type { WeekDayKey } from '@/entities/Schedule/model/constants';

interface Interval {
  start: string;
  end: string;
}

interface DayData {
  active: boolean;
  intervals: Interval[];
}

interface Props {
  dayKey: WeekDayKey;
  label: string;
  dayData: DayData;
  isViewMode: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:active', val: boolean): void;
  (e: 'add-interval'): void;
  (e: 'remove-interval', index: number): void;
  (e: 'copy-to-all'): void;
}>();

const toggleActive = () => {
  if (!props.isViewMode) {
    emit('update:active', !props.dayData.active);
  }
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Header: Checkbox + Add Button -->
    <div class="h-6 flex items-center gap-2">
      <AppCheckbox
        :model-value="dayData.active"
        :disabled="isViewMode"
        @update:model-value="(val) => emit('update:active', val)"
      />
      <span 
        class="font-bold text-[#1B3E69] cursor-pointer select-none"
        @click="toggleActive"
      >
        {{ label }}
      </span>
      
      <!-- Buttons Group -->
      <div v-if="dayData.active && !isViewMode" class="flex items-center gap-1 ml-2">
        <!-- Add Interval -->
        <button 
          @click="$emit('add-interval')"
          class="text-[#127EEE] hover:text-[#0e63bc] transition-colors p-1"
          title="Добавить интервал"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        </button>

        <!-- Copy To All -->
          <button 
          @click="$emit('copy-to-all')"
          class="text-[#3F5575] hover:text-[#127EEE] transition-colors p-1"
          title="Скопировать на все дни"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>

    </div>

    <!-- Time Inputs (Multiple Intervals) -->
    <div v-if="dayData.active" class="flex flex-col gap-2 pl-0">
      <div 
        v-for="(interval, index) in dayData.intervals" 
        :key="index"
        class="flex items-center gap-4 group"
      >
        <div class="flex-1 flex flex-col gap-1">
          <span v-if="index === 0" class="text-[13px] text-[#5B7395]">От:</span>
          <input 
            v-model="interval.start"
            type="time"
            :disabled="isViewMode"
            class="w-full h-10 px-3 bg-white border border-[#C6D6E8] rounded-lg text-[14px] text-[#3F5575] focus:outline-none focus:border-[#127EEE] disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
        <div class="flex-1 flex flex-col gap-1">
            <span v-if="index === 0" class="text-[13px] text-[#5B7395]">До:</span>
            <input 
            v-model="interval.end"
            type="time"
            :disabled="isViewMode"
            class="w-full h-10 px-3 bg-white border border-[#C6D6E8] rounded-lg text-[14px] text-[#3F5575] focus:outline-none focus:border-[#127EEE] disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
        <!-- Remove Button -->
          <button 
          v-if="!isViewMode"
          @click="$emit('remove-interval', index)"
          class="mt-auto mb-2 text-[#E02D2D] hover:text-[#b02222] opacity-40 hover:opacity-100 transition-opacity"
          title="Удалить"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    </div>
  </div>
</template>
