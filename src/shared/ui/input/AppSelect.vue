<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';

interface Option {
  value: string | number | null;
  label: string;
}

interface Props {
  modelValue: string | number | null;
  options: Option[] | string[];
  label?: string;
  placeholder?: string;
  error?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

const inputId = `select-${Math.random().toString(36).slice(2, 9)}`;

const formattedLabel = computed(() => {
  if (!props.label) return null;
  if (props.label.endsWith('*')) {
    return {
      text: props.label.slice(0, -1).trim(),
      required: true
    };
  }
  return {
    text: props.label,
    required: false
  };
});

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });
});

import { computed } from 'vue';
</script>

<template>
  <div class="w-full space-y-1">
    <label 
      v-if="formattedLabel" 
      :for="inputId"
      class="text-[16px] font-bold leading-none text-[#1B3E69]"
    >
      {{ formattedLabel.text }}
      <span v-if="formattedLabel.required" class="text-red-500 ml-0.5">*</span>
    </label>
    
    <div class="relative flex items-center">
      <select 
        :id="inputId"
        :value="modelValue"
        @change="e => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
        class="w-full h-[46px] pl-4 pr-10 bg-white border border-[#C6D6E8] rounded-[10px] appearance-none outline-none focus:border-[#1B3E69] focus:ring-1 focus:ring-[#1B3E69] text-[#1B3E69] text-sm font-medium cursor-pointer transition-all"
        :class="{ 
          'text-[#9AA6AC]': !modelValue,
          'border-red-500': error 
        }"
      >
        <option v-if="placeholder" :value="null" disabled hidden>
          {{ placeholder }}
        </option>
        <option v-for="opt in normalizedOptions" :key="String(opt.value)" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      
      <ChevronDown 
        class="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA6AC] pointer-events-none" 
        :size="18" 
      />
    </div>
    
    <span v-if="error" class="text-xs font-medium text-red-500 mt-1">
      {{ error }}
    </span>
  </div>
</template>
