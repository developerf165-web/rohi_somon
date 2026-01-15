<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number | null;
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const selectedValue = ref(props.modelValue);

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

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal;
});

const onInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full space-y-1">
    <label 
      v-if="formattedLabel" 
      class="text-[15px] font-bold text-[#1B3E69] leading-none"
    >
      {{ formattedLabel.text }}
      <span v-if="formattedLabel.required && !disabled" class="text-red-500 ml-0.5">*</span>
    </label>
    
    <div class="relative w-full">
        <select
          :value="modelValue"
          :disabled="disabled"
          class="w-full h-[46px] bg-white border rounded-[10px] pl-4 pr-10 appearance-none cursor-pointer focus:outline-none focus:border-[#1B3E69] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed text-[#1B3E69]"
          :class="[
            error ? 'border-red-500' : 'border-[#C6D6E8]',
            !modelValue ? 'text-[#8DA2C0]' : 'text-[#1B3E69]'
          ]"
          @change="onInput"
        >
          <option value="" disabled selected>{{ placeholder }}</option>
          <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
            class="text-[#1B3E69]"
          >
            {{ option.label }}
          </option>
        </select>
        
        <!-- Chevron Icon -->
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9AA6AC]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
    </div>

    <!-- Error Message -->
    <span v-if="error" class="text-xs font-medium text-red-500">
      {{ error }}
    </span>
  </div>
</template>
