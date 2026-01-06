<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square' | 'rounded';
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  alt: '',
  size: 'md',
  shape: 'circle',
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8';
    case 'lg': return 'w-12 h-12';
    case 'md':
    default: return 'w-10 h-10';
  }
});

const shapeClasses = computed(() => {
    switch (props.shape) {
        case 'square': return 'rounded-none';
        case 'rounded': return 'rounded-lg';
        case 'circle': 
        default: return 'rounded-full';
    }
});
</script>

<template>
  <div 
    :class="[
      'flex items-center justify-center bg-[#DFE8F5] text-[#1B3E69] border border-[#C6D6E8]/30 overflow-hidden',
      sizeClasses,
      shapeClasses
    ]"
  >
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt" 
      class="w-full h-full object-cover" 
    />
    <slot v-else>
        <!-- Default fallback icon if no slot provided -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    </slot>
  </div>
</template>
