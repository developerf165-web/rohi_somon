<script setup lang="ts">
import { LoginForm } from '@/features/auth-by-email';
import { useTheme } from '@/shared/lib/composables/useTheme';
import { 
  LogoAppDark, 
  LogoAppWhite, 
  LogoWithTextWhite 
} from '@/shared/assets/icons';

const { isDark } = useTheme();
</script>

<template>
  <div class="min-h-screen w-full flex bg-[var(--app-bg)] overflow-hidden relative transition-colors duration-500">
    <!-- Left Side: Large Historical Graphic -->
    <div class="hidden lg:flex w-3/5 relative items-center justify-center pointer-events-none">
      <div 
        class="absolute w-[450px] h-auto top-[70px] left-[-120px] rotate-[18deg] transition-all duration-1000 ease-in-out pointer-events-none select-none"
      >
        <LogoAppDark v-if="isDark" class="w-full h-auto" />
        <LogoAppWhite v-else class="w-full h-auto" />
      </div>
    </div>

    <!-- Right Side: Login Form Card -->
    <div class="w-full lg:w-2/5 flex items-center justify-center p-4 z-10 transition-colors duration-500 lg:-translate-x-24">
      <div 
        class="w-full max-w-[340px] rounded-[10px] p-5 md:p-6 flex flex-col transition-all duration-500 shadow-custom"
        :style="{
          backgroundColor: 'var(--login-card-bg)',
          '--app-text': 'var(--login-card-text)',
          '--text-muted': 'var(--login-card-muted)',
          '--app-input-bg': 'var(--login-card-bg)'
        }"
      >
        <!-- Brand Logo for the card - Always uses blue version for light background -->
        <div class="flex justify-center mb-6 pt-2">
           <div class="w-[110px] h-auto">
             <LogoWithTextWhite class="w-full h-auto" />
           </div>
        </div>

        <div class="mb-5 px-1">
          <h1 class="text-[20px] font-bold text-[var(--app-text)] mb-1">Форма входа</h1>
          <p class="text-[var(--text-muted)] text-[13px] leading-[1.2]">
            Добро пожаловать. Введите учетные данные для входа.
          </p>
        </div>

        <div class="px-1">
          <LoginForm />
        </div>

        <div class="mt-auto pt-6 text-center">
          <p class="text-[13px] text-[var(--text-muted)] font-normal">
            © 2025 Rohi Somon
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Any specific animations for the login page */
</style>
