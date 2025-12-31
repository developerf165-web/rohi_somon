<script setup lang="ts">
import type { Vacation } from '@/entities/Vacation';
import { TableActionButtons } from '@/shared/ui/table';

interface Props {
  vacation: Vacation;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();

const getTypeClass = (type: Vacation['type']) => {
  switch (type) {
    case 'Отпуск': return 'bg-[#127EEE] text-white border-none';
    case 'Отгул': return 'bg-[#0f172a] text-white border-none';
    case 'Больничный': return 'bg-[#E53E3E] text-white border-none';
    default: return 'bg-gray-100 text-gray-600';
  }
};
</script>

<template>
  <tr class="group hover:bg-slate-50 transition-colors">
    <!-- Selection -->
    <td class="py-4 px-6 text-center w-10">
      <input 
        type="checkbox" 
        class="w-[18px] h-[18px] rounded-[4px] border border-[#C6D6E8] appearance-none cursor-pointer bg-white checked:bg-[#1B3E69] transition-colors" 
      />
    </td>
    
    <!-- Photo -->
    <td class="py-4 px-4">
      <div class="w-10 h-10 mx-auto rounded-full bg-[#DFE8F5] flex items-center justify-center border border-[#C6D6E8]/30 overflow-hidden text-[#1B3E69]">
        <img v-if="vacation.photo" :src="vacation.photo" alt="" class="w-full h-full object-cover" />
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </td>
    
    <!-- Info -->
    <!-- Info -->
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none tracking-normal text-[#3F5575]">
      {{ vacation.fio }}
    </td>
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none tracking-normal text-[#3F5575]">
      {{ vacation.from }}
    </td>
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none tracking-normal text-[#3F5575]">
      {{ vacation.to }}
    </td>
    
    <!-- Type -->
    <td class="py-4 px-4 text-center">
      <span :class="['px-5 py-1.5 rounded-[5px] text-[13px] font-medium transition-colors', getTypeClass(vacation.type)]">
        {{ vacation.type }}
      </span>
    </td>
    
    <!-- Actions -->
    <td class="py-4 px-4 text-center min-w-[140px]">
      <div class="flex items-center justify-center">
        <TableActionButtons 
          :id="vacation.id"
          @view="id => emit('view', id)"
          @edit="id => emit('edit', id)"
          @delete="id => emit('delete', id)"
        />
      </div>
    </td>
  </tr>
</template>
