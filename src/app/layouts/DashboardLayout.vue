<script setup lang="ts">
import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <Header />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-white px-[20px] py-[24px]">
        <div class="max-w-[1440px] mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
main {
  transition: padding 0.3s ease;
}
</style>
