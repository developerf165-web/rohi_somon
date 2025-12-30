<script setup lang="ts">
import { IconBell } from '@/shared/assets/icons';
</script>

<template>
  <div class="flex items-center gap-4">
    <button class="text-[#3F5575] hover:opacity-80 transition-opacity">
      <IconBell class="w-6 h-6" />
    </button>
    <div class="w-8 h-8 rounded-full border border-black/10 overflow-hidden cursor-pointer hover:border-[#1B3E69] transition-all">
      <img src="@/assets/foto.jpg" alt="User Profile" class="w-full h-full object-cover" />
    </div>
  </div>
</template>
