<script setup lang="ts">
import { ref, watch } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number | null;
  options: Option[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const selectedValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal;
});

const onInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="relative w-full">
    <select
      :value="modelValue"
      :disabled="disabled"
      class="w-full h-11 px-4 bg-[#F8FAFC] border rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#127EEE] transition-colors font-['Manrope'] text-[14px] disabled:opacity-60 disabled:cursor-not-allowed"
      :class="[
        error ? 'border-[#E02D2D]' : 'border-[#C6D6E8]',
        !modelValue ? 'text-[#8FA0B2]' : 'text-[#3F5575]'
      ]"
      @change="onInput"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
        class="text-[#3F5575]"
      >
        {{ option.label }}
      </option>
    </select>
    
    <!-- Chevron Icon -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#3F5575]">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>

    <!-- Error Message -->
    <span v-if="error" class="absolute -bottom-5 left-0 text-[12px] text-[#E02D2D] leading-none">
      {{ error }}
    </span>
  </div>
</template>
