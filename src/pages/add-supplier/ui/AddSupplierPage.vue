<script setup lang="ts">
import SupplierForm from '@/features/create-supplier/ui/SupplierForm.vue';

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
    <SupplierForm :id="id" :mode="mode" />
  </div>
</template>
