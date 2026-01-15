<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputId = `input-${Math.random().toString(36).slice(2, 9)}`;

const inputClasses = computed(() => {
  return [
    'flex h-[46px] w-full rounded-[10px] border bg-[var(--app-input-bg,white)] px-4 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1B3E69] disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-secondary-950 dark:placeholder:text-secondary-400',
    props.error ? 'border-red-500 text-red-500 focus-visible:ring-red-500' : 'border-[#C6D6E8] text-[#1B3E69] focus-visible:border-[#1B3E69]'
  ].join(' ');
});

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

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full space-y-1">
    <label 
      v-if="formattedLabel" 
      :for="inputId"
      class="text-[15px] font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1B3E69]"
    >
      {{ formattedLabel.text }}
      <span v-if="formattedLabel.required && !props.disabled" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="relative flex items-center">
      <div 
        v-if="$slots.prefix" 
        class="absolute left-4 flex items-center justify-center text-[#8DA2C0]"
      >
        <slot name="prefix"></slot>
      </div>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          inputClasses,
          $slots.append ? 'pr-10' : '',
          $slots.prefix ? 'pl-11' : ''
        ]"
        class="placeholder-[#8DA2C0]"
        @input="onInput"
      />
      <div 
        v-if="$slots.append" 
        class="absolute right-[1.5px] h-[calc(100%-3px)] px-3 bg-[#DFE8F5] border-l border-[#C6D6E8] rounded-r-[6px] flex items-center justify-center text-[#1B3E69]"
      >
        <slot name="append"></slot>
      </div>
    </div>
    <span v-if="error" class="text-xs font-medium text-red-500">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #8DA2C0 !important;
  opacity: 1;
}
</style>
