<script setup lang="ts">
import { AppModal } from '@/shared/ui/modal';
import { AppButton } from '@/shared/ui/button';

interface Props {
  show: boolean;
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <AppModal 
    :show="show" 
    title="Удалить" 
    @close="emit('close')"
    max-width="600px"
  >
    <div class="px-6 py-4">
      <p class="text-[#1B3E69] text-[16px] font-medium leading-normal">
        Вы уверены, что хотите удалить ? Это действие необратимо.
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <AppButton 
          variant="secondary" 
          class="h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-8 disabled:opacity-50"
          :disabled="isLoading"
          @click="emit('close')"
        >
          Отмена
        </AppButton>
        <AppButton 
          variant="danger" 
          :loading="isLoading"
          class="h-[46px] bg-[#FF3B30] hover:bg-[#D63026] border-[#FF3B30] px-8 text-white"
          @click="emit('confirm')"
        >
          Удалить
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
