<script setup lang="ts">
import { LogoAppWhite } from '@/shared/assets/icons';
import HeaderSearchBar from './HeaderSearchBar.vue';
import HeaderActions from './HeaderActions.vue';
</script>

<template>
  <header 
    class="w-full h-[70px] bg-white border-b border-[#C6D6E8] flex items-center justify-between px-6 sticky top-0 z-50 transition-all duration-300"
  >
    <!-- Left side: Logo & Branding -->
    <div class="flex items-center gap-[10px] cursor-pointer hover:opacity-90 transition-opacity">
      <div class="w-[50px] h-[50px]">
        <LogoAppWhite class="w-full h-full text-[#1B3E69]" />
      </div>
      <span class="text-[16px] font-bold leading-5 text-[#1B3E69] uppercase tracking-wide">
        Rohi Somon
      </span>
    </div>

    <!-- Right side: Search & Actions -->
    <div class="flex items-center gap-6">
      <HeaderSearchBar />
      <HeaderActions />
    </div>
  </header>
</template>

<style scoped>
/* Ensure clean font rendering */
header {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
