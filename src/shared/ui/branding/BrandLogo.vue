<script setup lang="ts">
import { IconSun, IconThemeMixed } from '@/shared/assets/icons';

const props = defineProps<{
  isDarkMode: boolean;
}>();


</script>

<template>
  <div 
    class="relative flex items-center justify-center transition-all duration-300 overflow-hidden shrink-0"
  >
    <IconSun v-if="isDarkMode" class="w-auto h-auto" />
    <IconThemeMixed v-else class="w-auto h-auto" />
  </div>
</template>
