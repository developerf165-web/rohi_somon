<script setup lang="ts">

interface Props {
  show: boolean;
  title?: string;
  width?: string;
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
    <Transition name="drawer">
      <div v-if="show" class="fixed inset-0 z-[100] flex justify-end">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-[#0E2036] opacity-40 backdrop-blur-[2px] transition-opacity" 
          @click="close"
        ></div>
        
        <!-- Drawer Content -->
        <div 
          class="relative bg-white shadow-2xl h-full flex flex-col overflow-hidden"
          :style="{ width: width || '430px' }"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-8 py-6">
            <h3 class="text-[24px] font-bold text-[#1B3E69]">{{ title }}</h3>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-8 py-2">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-8 py-6 border-t border-[#DFE8F56B]">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.drawer-enter-active :deep(.fixed.inset-0.bg-\[\#0E2036\]) {
  transition: opacity 0.3s ease-out;
}

.drawer-enter-from :deep(.fixed.inset-0.bg-\[\#0E2036\]) {
  opacity: 0;
}
</style>
