<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rows: 4,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputId = `textarea-${Math.random().toString(36).slice(2, 9)}`;

const classes = computed(() => {
  return [
    'flex w-full rounded-[6px] border bg-white px-3 py-2 text-sm transition-all placeholder:text-[#8DA2C0] outline-none focus:border-[#1B3E69] disabled:cursor-not-allowed disabled:opacity-50 resize-none',
    props.error ? 'border-red-500 text-red-500' : 'border-[#C6D6E8] text-[#1B3E69]'
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
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full space-y-1">
    <label 
      v-if="formattedLabel" 
      :for="inputId"
      class="text-[16px] font-bold text-[#1B3E69] leading-none"
    >
      {{ formattedLabel.text }}
      <span v-if="formattedLabel.required" class="text-red-500 ml-0.5">*</span>
    </label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="classes"
      @input="onInput"
    ></textarea>
    <span v-if="error" class="text-xs font-medium text-red-500">
      {{ error }}
    </span>
  </div>
</template>
