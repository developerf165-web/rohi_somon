<script setup lang="ts">
import { IconPinLarge } from '@/shared/assets/icons';
import { Store, MapPin, Eye, Pencil, Trash2 } from 'lucide-vue-next';
import { computed } from 'vue';

interface Props {
  id: number | string;
  title: string;
  address: string;
  image?: string;
  images?: string[];
}

const props = defineProps<Props>();

const displayImage = computed(() => {
  // If images array is provided (from store/api update), it's the absolute source of truth
  if (props.images !== undefined) {
    return props.images.length > 0 ? props.images[0] : null;
  }
  
  // Fallback to legacy singular image prop only if images is undefined
  return props.image || null;
});

// Debug log for troubleshooting sync issues
import { watch } from 'vue';
watch(() => [props.image, props.images], ([img, imgs]) => {
  console.log(`[PointCard Debug] ID: ${props.id} Title: ${props.title}`);
  console.log(` - props.image: ${img ? 'exists' : 'null/empty'}`);
  console.log(` - props.images: ${imgs ? `count: ${imgs.length}` : 'undefined'}`);
}, { immediate: true });

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
  (e: 'map', id: number | string): void;
}>();
</script>

<template>
  <div class="w-[242px] h-[299px] bg-[var(--card-bg)] rounded-[10px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg group">
    <!-- Image Section -->
    <div class="h-[189px] w-full relative bg-[#E1EAF6] flex items-center justify-center overflow-hidden">
      <img 
        v-if="displayImage" 
        :src="displayImage" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        alt="Point Image"
      />
      <div v-else class="flex items-center justify-center">
        <IconPinLarge class="w-[116px] h-[116px] opacity-40 text-[var(--icon-pin)]" />
      </div>
    </div>

    <!-- Info Section -->
    <div class="h-[110px] w-full bg-[var(--card-bg)] px-4 py-3 flex flex-col justify-between shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.2)] relative z-10">
      <div class="space-y-1">
        <!-- Title -->
        <div class="flex items-center gap-2 text-[var(--card-title)]">
          <Store :size="18" />
          <span class="text-[15px] font-bold leading-none truncate">
            {{ title }}
          </span>
        </div>
        
        <!-- Address -->
        <div class="flex items-center gap-2 text-[var(--card-text)]">
          <MapPin :size="16" />
          <span class="text-[13px] font-medium leading-none truncate opacity-80">
            {{ address }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 pt-1">
        <!-- View -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#1EB564] flex items-center justify-center text-[#1EB564] bg-[#1EB564]/5 hover:bg-[#1EB564] hover:text-white transition-all active:scale-90"
          @click="emit('view', id)"
        >
          <Eye :size="15" />
        </button>
        
        <!-- Edit -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#127EEE] flex items-center justify-center text-[#127EEE] bg-[#127EEE]/5 hover:bg-[#127EEE] hover:text-white transition-all active:scale-90"
          @click="emit('edit', id)"
        >
          <Pencil :size="15" />
        </button>
        
        <!-- Delete -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#FD5050] flex items-center justify-center text-[#FD5050] bg-[#FD5050]/5 hover:bg-[#FD5050] hover:text-white transition-all active:scale-90"
          @click="emit('delete', id)"
        >
          <Trash2 :size="15" />
        </button>
        
        <!-- Map/Location -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#AB85FC] flex items-center justify-center text-[#AB85FC] bg-[#AB85FC]/5 hover:bg-[#AB85FC] hover:text-white transition-all active:scale-90"
          @click="emit('map', id)"
        >
          <MapPin :size="15" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
