<script setup lang="ts">
/**
 * AddArrivalPage.vue
 * Страница добавления, редактирования и просмотра прихода.
 */
import ArrivalForm from '@/features/create-arrival/ui/ArrivalForm.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

withDefaults(defineProps<Props>(), {
  mode: 'add',
});
</script>

<template>
  <div class="font-manrope">
    <ArrivalForm :id="id" :mode="mode" />
  </div>
</template>
