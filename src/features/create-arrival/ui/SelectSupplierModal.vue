<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { AppSelectionModal } from '@/shared/ui/selection-modal';
import { useSupplierStore } from '@/entities/Supplier';

interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', supplier: any): void;
}>();

const supplierStore = useSupplierStore();

onMounted(() => {
  supplierStore.fetchSuppliers();
});

watch(() => supplierStore.filters.search, () => {
    supplierStore.fetchSuppliers();
});

const headers = [
  { key: 'index', label: '№', align: 'center' as const, width: '40px' },
  { key: 'name', label: 'Имя поставщика', align: 'left' as const },
  { key: 'phoneNumber', label: 'Номер телефона', align: 'left' as const },
];

const handleSelect = (item: any) => {
  emit('select', item);
  emit('close');
};
</script>

<template>
  <AppSelectionModal
    :show="show"
    title="Выбор поставщика"
    v-model="supplierStore.filters.search"
    :headers="headers"
    :items="supplierStore.filteredSuppliers"
    :is-loading="supplierStore.isLoading"
    max-width="800px"
    @close="emit('close')"
    @select="handleSelect"
  />
</template>
