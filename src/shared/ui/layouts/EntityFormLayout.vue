<script setup lang="ts">
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';

interface Props {
  title: string;
  parentTitle: string;
  parentRoute?: string;
  loading?: boolean;
}

const props = defineProps<Props>();
const router = useRouter();

const goBack = () => {
    if (props.parentRoute) {
        router.push(props.parentRoute);
    } else {
        router.back();
    }
}
</script>

<template>
  <DashboardLayout>
    <div class="space-y-5">
      <!-- Header -->
      <div class="space-y-1 ml-1">
        <h1 class="text-[32px] font-bold text-[#1B3E69] leading-tight">{{ title }}</h1>
        <nav class="flex text-[14px] text-[#8DA2C0] gap-1.5 items-center">
          <span 
              class="transition-colors hover:text-[#1B3E69] cursor-pointer" 
              @click="goBack"
          >
              {{ parentTitle }}
          </span>
          <span class="text-[#8DA2C0] text-[12px]">/</span>
          <span class="text-[#1B3E69] font-medium">{{ title }}</span>
        </nav>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-[10px] p-5 space-y-4 relative">
         <!-- Optional Loading Overlay -->
          <div v-if="loading" class="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-[10px]">
              <!-- Spinner could go here -->
          </div>
          
        <slot></slot>
        
        <slot name="actions"></slot>
      </div>
    </div>
  </DashboardLayout>
</template>
