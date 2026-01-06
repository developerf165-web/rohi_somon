<script setup lang="ts">
import NomenclatureForm from '@/features/create-nomenclature/ui/NomenclatureForm.vue';

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
    <NomenclatureForm :id="id" :mode="mode" />
  </div>
</template>
