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
    title="Удалить сотрудника"
    max-width="600px"
    @close="emit('close')"
  >
    <div class="px-6 py-4">
      <p class="text-[#1B3E69] text-[16px] font-medium leading-normal">
        Вы уверены, что хотите удалить этого сотрудника? Это действие необратимо.
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <AppButton
          variant="secondary"
          class="h-[46px] px-8 border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 disabled:opacity-50"
          :disabled="isLoading"
          @click="emit('close')"
        >
          Отмена
        </AppButton>
        <AppButton
          variant="danger"
          class="h-[46px] px-8 bg-[#FF3B30] hover:bg-[#D63026] border-[#FF3B30] text-white"
          :loading="isLoading"
          @click="emit('confirm')"
        >
          Удалить
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
