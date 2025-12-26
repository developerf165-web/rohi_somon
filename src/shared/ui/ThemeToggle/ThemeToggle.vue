<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '../../lib/composables/useTheme';
import { themeConfig } from '../../config/theme.config';
import BrandLogo from '../branding/BrandLogo.vue';

const { isDark, toggleTheme, initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div 
    v-if="themeConfig.showThemeToggle"
    @click="toggleTheme"
    class="fixed top-6 right-20 z-[10000] w-[70px] h-[30px] flex items-center bg-slate-200/50 dark:bg-slate-800/50  rounded-full cursor-pointer transition-colors duration-300 p-1.5 shadow-lg border border-slate-300/30 dark:border-slate-700/30"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <div 
      class="transform transition-transform duration-300 flex items-center justify-center shrink-0"
      :class="isDark ? 'translate-x-[34px]' : 'translate-x-0'"
    >
      <BrandLogo :isDarkMode="isDark" />
    </div>
  </div>
</template>
