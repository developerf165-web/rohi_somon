<script setup lang="ts">
import { computed } from 'vue';
import { AppButton } from '@/shared/ui/button';

interface Props {
  isLoading?: boolean;
  saveText?: string;
  cancelText?: string;
  hideSave?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  saveText: 'Сохранить',
  hideSave: false,
});

const displayCancelText = computed(() => {
    if (props.cancelText) return props.cancelText;
    return props.hideSave ? 'Назад' : 'Отмена';
});

defineEmits<{
  (e: 'save'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div class="flex justify-end gap-3 pt-4">
    <AppButton 
      variant="secondary" 
      class="w-[190px] h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-[56px] py-[12px]"
      @click="$emit('cancel')"
    >
      {{ displayCancelText }}
    </AppButton>
    <AppButton 
      v-if="!hideSave"
      variant="primary" 
      :loading="isLoading"
      class="w-[190px] h-[46px] bg-[#1B3E69] border-[#1B3E69] px-[56px] py-[12px]"
      @click="$emit('save')"
    >
      {{ saveText }}
    </AppButton>
  </div>
</template>
