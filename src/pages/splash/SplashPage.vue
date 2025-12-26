<script setup lang="ts">
import { useTheme } from '@/shared/lib/composables/useTheme'
import LogoWithTextWhite from '@/shared/assets/icons/LogoWithTextWhite.vue'
import LogoWithTextDark from '@/shared/assets/icons/LogoWithTextDark.vue'

const { isDark } = useTheme()
</script>

<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--splash-bg)] transition-opacity duration-500 ease-out">
    <div class="flex flex-col items-center gap-8">
      <div class="w-64 md:w-80 animate-pulse-custom">
        <LogoWithTextDark v-if="isDark" class="w-full h-auto" />
        <LogoWithTextWhite v-else class="w-full h-auto" />
      </div>

      <div class="flex flex-col items-center gap-3">
        <div :class="[
          'animate-spinner w-8 h-8',
          isDark ? 'text-blue-400' : 'text-blue-600'
        ]"></div>
        <p :class="[
          'text-lg tracking-widest font-inter weight-400',
          isDark ? 'text-slate-200' : 'text-blue-800'
        ]">
          Загрузка...
        </p>
      </div>
    </div>
  </div>
</template>
