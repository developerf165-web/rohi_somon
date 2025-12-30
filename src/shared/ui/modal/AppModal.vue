<script setup lang="ts">
import { X } from 'lucide-vue-next';

interface Props {
  show: boolean;
  title?: string;
  maxWidth?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-[#0E2036] opacity-40 backdrop-blur-[2px]" @click="close"></div>
        
        <!-- Modal Content -->
        <div 
          class="relative bg-white rounded-[20px] shadow-2xl w-full flex flex-col overflow-hidden max-h-[95vh]"
          :style="{ maxWidth: maxWidth || '950px' }"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 class="text-[20px] font-bold text-[#1B3E69]">{{ title }}</h3>
            <button 
              @click="close"
              class="text-[#1B3E69] hover:text-red-500 transition-colors p-1"
            >
              <X :size="24" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto min-h-0">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-5 border-t border-slate-100 bg-white">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
