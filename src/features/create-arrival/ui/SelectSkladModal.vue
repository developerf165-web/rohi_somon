<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { AppSelectionModal } from '@/shared/ui/selection-modal';
import { useSkladStore } from '@/entities/Sklad';
import { usePointStore, type Point } from '@/entities/Point';

interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', sklad: any): void;
}>();

const skladStore = useSkladStore();
const pointStore = usePointStore();

onMounted(async () => {
  await Promise.all([
    skladStore.fetchSklads(),
    pointStore.fetchPoints()
  ]);
});

watch(() => skladStore.filters.search, () => {
    skladStore.filters.page = 1;
    skladStore.fetchSklads();
});

const getPointAddress = (pointId: number | string) => {
  const point = pointStore.points.find((p: Point) => p.id == pointId);
  return point ? point.address : 'Неизвестно';
};

const headers = [
  { key: 'index', label: '№', align: 'center' as const, width: '40px' },
  { key: 'name', label: 'Имя склада', align: 'left' as const },
  { key: 'address', label: 'Адрес', align: 'left' as const },
];

const handleSelect = (item: any) => {
  emit('select', item);
  emit('close');
};
</script>

<template>
  <AppSelectionModal
    :show="show"
    title="Выбор склада"
    v-model="skladStore.filters.search"
    :headers="headers"
    :items="skladStore.items"
    :is-loading="skladStore.isLoading"
    max-width="750px"
    @close="emit('close')"
    @select="handleSelect"
  >
    <template #item-address="{ item }">
      <span class="text-[#3F5575]">
        {{ getPointAddress(item.pointId) }}
      </span>
    </template>
  </AppSelectionModal>
</template>
