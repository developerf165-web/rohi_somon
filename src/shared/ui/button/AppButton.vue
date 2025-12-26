<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
});

const baseStyles = 'inline-flex items-center justify-center rounded-[4px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-[#1B3E69] text-white hover:opacity-90 shadow-sm active:scale-95',
  secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:scale-95',
  outline: 'border border-secondary-200 bg-transparent hover:bg-secondary-50 active:scale-95 text-secondary-700 dark:text-secondary-200 dark:border-secondary-700 dark:hover:bg-secondary-800',
  ghost: 'bg-transparent hover:bg-secondary-100 active:scale-95 text-secondary-700 dark:text-secondary-200 dark:hover:bg-secondary-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95 focus-visible:ring-red-500',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10',
};

const classes = computed(() => {
  return [
    baseStyles,
    variants[props.variant],
    sizes[props.size],
    props.loading ? 'cursor-wait' : '',
  ].join(' ');
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
  >
    <div v-if="loading" class="mr-2">
      <!-- Simple loading spinner icon -->
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <slot />
  </button>
</template>
