<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SplashPage from '@/pages/splash/SplashPage.vue'
import { useTheme } from '@/shared/lib/composables/useTheme'

const showSplash = ref(true)
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
  // Hide splash screen after 2 seconds
  setTimeout(() => {
    showSplash.value = false
  }, 2000)
})
</script>

<template>
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
