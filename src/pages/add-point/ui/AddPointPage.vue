<script setup lang="ts">
import PointForm from '@/features/create-point/ui/PointForm.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view' | 'map';
}

withDefaults(defineProps<Props>(), {
  mode: 'add',
});
</script>

<template>
  <div class="font-manrope">
    <PointForm :id="id" :mode="mode" />
  </div>
</template>
