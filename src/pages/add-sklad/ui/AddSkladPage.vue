<script setup lang="ts">
import SkladForm from '@/features/create-sklad/ui/SkladForm.vue';

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
    <SkladForm :id="id" :mode="mode" />
  </div>
</template>
