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
    'flex h-9 w-full rounded-[4px] border-[1.5px] bg-[var(--app-input-bg,white)] px-3 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-secondary-950 dark:placeholder:text-secondary-400',
    props.error ? 'border-red-500 text-red-500 focus-visible:ring-red-500' : 'border-[#8DA2C0] text-[#20508A] focus-visible:ring-primary-500'
  ].join(' ');
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full space-y-1">
    <label 
      v-if="label" 
      :for="inputId"
      class="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--app-text)]"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        class="placeholder-[#8DA2C0]"
        style="--placeholder-color: #8DA2C0"
        @input="onInput"
      />
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
