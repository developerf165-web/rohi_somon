<script setup lang="ts">
import SupplierCard from '@/entities/Supplier/ui/SupplierCard.vue';
import type { Supplier } from '@/entities/Supplier/model/types';

interface Props {
  suppliers: Supplier[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
    <SupplierCard
      v-for="supplier in suppliers"
      :key="supplier.id"
      :supplier="supplier"
      @view="(id) => emit('view', id)"
      @edit="(id) => emit('edit', id)"
      @delete="(id) => emit('delete', id)"
    />
  </div>
</template>
