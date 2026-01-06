<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  variant?: 'default' | 'blue' | 'dark' | 'red' | 'green' | 'light-blue' | 'yellow' | 'purple' | 'indigo';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'bg-[#127EEE] text-white';
    case 'dark':
      return 'bg-[#0f172a] text-white';
    case 'red':
      return 'bg-[#E53E3E] text-white';
    case 'green':
      return 'bg-[#DAF7A6] text-[#5D8000]';
    case 'light-blue':
      return 'bg-[#B3E5FC] text-[#0277BD]';
    case 'purple':
      return 'bg-[#E9D8FD] text-[#6B46C1]';
    case 'indigo':
      return 'bg-[#C3DAFE] text-[#3C366B]';
    case 'yellow':
        return 'bg-[#FFF9C4] text-[#FBC02D]';
    case 'default':
    default:
      return 'bg-gray-100 text-gray-600';
  }
});
</script>

<template>
  <span 
    :class="[
      'px-5 py-1.5 rounded-[5px] text-[13px] font-medium transition-colors inline-block text-center leading-none select-none',
      variantClasses
    ]"
  >
    {{ label }}
  </span>
</template>
