<script setup lang="ts">
import { IconCV } from '@/shared/assets/icons';
import type { Kadr } from '@/entities/Kadr';
import { TableActionButtons } from '@/shared/ui/table';

interface Props {
  employee: Kadr;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
  (e: 'cv-click', id: number | string): void;
}>();

const getRoleClass = (role: Kadr['role']) => {
  switch (role) {
    case 'admin': return 'bg-[#BEE3F8] text-[#2B6CB0]';
    case 'worker': return 'bg-[#D9F99D] text-[#4D7C0F]';
    case 'saler': return 'bg-[#E9D8FD] text-[#6B46C1]';
    case 'manager': return 'bg-[#C3DAFE] text-[#3C366B]';
    default: return 'bg-gray-100 text-gray-600';
  }
};
</script>

<template>
  <tr class="group hover:bg-slate-50 transition-colors">
    <!-- Selection -->
    <td class="py-4 px-6 text-center">
      <input 
        type="checkbox" 
        class="w-[18px] h-[18px] rounded-[4px] border border-[#C6D6E8] appearance-none cursor-pointer bg-white checked:bg-[#1B3E69] transition-colors" 
      />
    </td>
    
    <!-- Photo -->
    <td class="py-4 px-4">
      <div class="w-10 h-10 mx-auto rounded-full bg-[#DFE8F5] flex items-center justify-center border border-[#C6D6E8]/30 overflow-hidden text-[#1B3E69]">
        <img v-if="employee.photo" :src="employee.photo" alt="" class="w-full h-full object-cover" />
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </td>
    
    <!-- Info -->
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575]">
      {{ employee.name }}
    </td>
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575]">
      {{ employee.position }}
    </td>
    <td class="py-4 px-4 text-center font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575]">
      {{ employee.birthDate }}
    </td>
    
    <!-- CV -->
    <td class="py-4 px-4 text-center">
      <button 
        class="inline-flex items-center transition-opacity hover:opacity-100"
        :class="employee.cvUrl ? 'opacity-100' : 'opacity-30'"
        @click="employee.cvUrl && emit('cv-click', employee.id)"
      >
        <IconCV />
      </button>
    </td>
    
    <!-- Role -->
    <td class="py-4 px-4 text-center">
      <span :class="['px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider', getRoleClass(employee.role)]">
        {{ employee.role }}
      </span>
    </td>
    
    <!-- Gender / Actions -->
    <td class="py-4 px-4 text-center min-w-[140px]">
      <div class="relative h-9 flex items-center justify-center">
        <span class="font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575] group-hover:invisible">
          {{ employee.gender }}
        </span>
        <div class="absolute inset-0 invisible group-hover:visible flex items-center justify-center">
          <TableActionButtons 
            :id="employee.id"
            @view="id => emit('view', id)"
            @edit="id => emit('edit', id)"
            @delete="id => emit('delete', id)"
          />
        </div>
      </div>
    </td>
  </tr>
</template>
