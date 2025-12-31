<script setup lang="ts">
import type { Schedule } from '@/entities/Schedule';
import { TableActionButtons } from '@/shared/ui/table';
import { AppCheckbox } from '@/shared/ui/checkbox';

interface Props {
  schedule: Schedule;
  index: number;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();
</script>

<template>
  <tr class="group hover:bg-slate-50 transition-colors">
    <!-- Index -->
    <td class="py-4 px-6 text-center text-[#3F5575] font-semibold text-[14px]">
      {{ index + 1 }}
    </td>
    
    <!-- FIO -->
    <td class="py-4 px-4 text-[#3F5575] font-['Manrope'] font-semibold text-[14px]">
      {{ schedule.fio }}
    </td>
    
    <!-- Days Checkboxes -->
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.mon" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.tue" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.wed" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.thu" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.fri" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.sat" readonly />
      </div>
    </td>
    <td class="py-4 px-4 text-center">
      <div class="flex justify-center">
        <AppCheckbox :model-value="schedule.schedule.sun" readonly />
      </div>
    </td>
    
    <!-- Actions -->
    <td class="py-4 px-4 text-center min-w-[140px]">
      <div class="flex items-center justify-center">
        <TableActionButtons 
          :id="schedule.id"
          @view="id => emit('view', id)"
          @edit="id => emit('edit', id)"
          @delete="id => emit('delete', id)"
        />
      </div>
    </td>
  </tr>
</template>
