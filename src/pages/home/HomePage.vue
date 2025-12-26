<script setup lang="ts">
import { AppButton } from '@/shared/ui/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#0B1E33] text-white p-6">
    <h1 class="text-4xl font-bold mb-4">Rohi Somon</h1>
    <p class="text-xl text-blue-200 mb-8 max-w-md text-center">
      Добро пожаловать в систему Rohi Somon. Пожалуйста, авторизуйтесь для доступа к функциям.
    </p>
    
    <div class="flex gap-4">
      <AppButton @click="goToLogin" size="lg">
        Войти в систему
      </AppButton>
    </div>
  </div>
</template>
