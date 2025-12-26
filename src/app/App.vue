<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SplashPage from '@/pages/splash/SplashPage.vue'
import ThemeToggle from '@/shared/ui/ThemeToggle/ThemeToggle.vue'
const showSplash = ref(true)

onMounted(() => {
  // Hide splash screen after 2 seconds
  setTimeout(() => {
    showSplash.value = false
  }, 2000)
})
</script>

<template>
  <ThemeToggle />
  
  <Transition name="fade">
    <SplashPage v-if="showSplash" />
  </Transition>

  <main v-if="!showSplash" class="min-h-screen w-full">
    <RouterView />
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
