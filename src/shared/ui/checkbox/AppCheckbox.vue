<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const inputId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;

const toggle = () => {
  if (props.disabled) return;
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <div class="relative flex items-center h-5">
      <!-- Hidden native input -->
      <input
        :id="inputId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="sr-only"
        @change="toggle"
      />
      <!-- Custom visual checkbox -->
      <div
        class="w-4 h-4 rounded-[2px] border-[1.5px] border-[#8DA2C0] transition-all duration-200 cursor-pointer flex items-center justify-center select-none"
        :class="[
          modelValue ? 'bg-[#3b82f6] border-[#3b82f6]' : 'bg-[var(--app-input-bg,white)]',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#3b82f6]'
        ]"
        @click="toggle"
      >
        <svg 
          v-if="modelValue"
          class="w-3.5 h-3.5 text-white" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="3.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
    <label 
      v-if="label" 
      :for="inputId" 
      class="text-[13px] font-normal text-[var(--app-text)] cursor-pointer select-none"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
/* No extra scoped styles needed as we use Tailwind and inline classes for high specificity */
</style>
