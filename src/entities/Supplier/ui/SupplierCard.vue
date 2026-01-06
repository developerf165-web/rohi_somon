<script setup lang="ts">
import IconBuildingPlaceholder from '@/shared/assets/icons/IconBuildingPlaceholder.vue';
import { Truck, Building2, Phone, MapPin, Eye, Pencil, Trash2 } from 'lucide-vue-next';
import type { Supplier } from '../model/types';

interface Props {
  supplier: Supplier;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();
</script>

<template>
  <div class="w-[242px] h-[299px] bg-[var(--card-bg)] rounded-[10px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg group text-left">
    <!-- Image Section -->
    <div class="h-[189px] w-full relative bg-[#E1EAF6] flex items-center justify-center overflow-hidden">
      <img 
        v-if="supplier.photo" 
        :src="supplier.photo" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        alt="Supplier Image"
      />
      <!-- Fallback Icon if no photo -->
      <div v-else class="flex items-center justify-center">
        <!-- Building icon for companies, generic for others if no photo -->
        <IconBuildingPlaceholder class="w-[80px] h-[80px] text-[#1B3E69]" />
      </div>
    </div>

    <!-- Info Section -->
    <div class="h-[110px] w-full bg-[var(--card-bg)] px-4 py-3 flex flex-col justify-between shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.2)] relative z-10">
      <div class="space-y-1">
        <!-- Title -->
        <div class="flex items-center gap-2 text-[var(--card-title)]">
          <Truck v-if="supplier.type === 'transport'" :size="18" />
          <Building2 v-else-if="supplier.type === 'company'" :size="18" />
          
          <span class="text-[15px] font-bold leading-none truncate">
            {{ supplier.name }}
          </span>
        </div>
        
        <!-- Subtitle: Phone or Address -->
        <div class="flex items-center gap-2 text-[var(--card-text)]">
          <Phone v-if="supplier.phoneNumber" :size="16" />
          <MapPin v-else-if="supplier.address" :size="16" />
          
          <span class="text-[13px] font-medium leading-none truncate opacity-80">
            {{ supplier.phoneNumber || supplier.address || 'Нет данных' }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 pt-1">
        <!-- View -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#1EB564] flex items-center justify-center text-[#1EB564] bg-[#1EB564]/5 hover:bg-[#1EB564] hover:text-white transition-all active:scale-90"
          @click="emit('view', supplier.id)"
        >
          <Eye :size="15" />
        </button>
        
        <!-- Edit -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#127EEE] flex items-center justify-center text-[#127EEE] bg-[#127EEE]/5 hover:bg-[#127EEE] hover:text-white transition-all active:scale-90"
          @click="emit('edit', supplier.id)"
        >
          <Pencil :size="15" />
        </button>
        
        <!-- Delete -->
        <button 
          class="w-7 h-7 rounded-[4px] border border-[#FD5050] flex items-center justify-center text-[#FD5050] bg-[#FD5050]/5 hover:bg-[#FD5050] hover:text-white transition-all active:scale-90"
          @click="emit('delete', supplier.id)"
        >
          <Trash2 :size="15" />
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
