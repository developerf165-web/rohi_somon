<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { AppSelectionModal } from '@/shared/ui/selection-modal';
import { useNomenclatureStore } from '@/entities/Nomenclature';

interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', product: any): void;
}>();

const nomenclatureStore = useNomenclatureStore();

onMounted(() => {
  nomenclatureStore.fetchItems();
});

watch(() => nomenclatureStore.filters.search, () => {
    nomenclatureStore.filters.page = 1;
    nomenclatureStore.fetchItems();
});

const headers = [
  { key: 'index', label: '№', align: 'center' as const, width: '40px' },
  { key: 'name', label: 'Имя продукта', align: 'left' as const },
  { key: 'unit', label: 'Единица', align: 'left' as const },
];

const handleSelect = (item: any) => {
  emit('select', item);
  emit('close');
};
</script>

<template>
  <AppSelectionModal
    :show="show"
    title="Выбор продукта"
    v-model="nomenclatureStore.filters.search"
    :headers="headers"
    :items="nomenclatureStore.items"
    :is-loading="nomenclatureStore.isLoading"
    max-width="800px"
    @close="emit('close')"
    @select="handleSelect"
  />
</template>
