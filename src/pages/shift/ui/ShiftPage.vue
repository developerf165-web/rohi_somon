<script setup lang="ts">
import { onMounted, watch } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ShiftTable } from '@/widgets/ShiftTable';
import { useShiftStore } from '@/entities/Shift';
import { AppPagination } from '@/shared/ui/AppPagination';

const shiftStore = useShiftStore();

const fetchData = async () => {
  await shiftStore.fetchShifts();
};

onMounted(async () => {
  await fetchData();
});

watch(
  () => [shiftStore.filters.page, shiftStore.filters.limit],
  () => fetchData()
);

watch(
  () => shiftStore.filters.search,
  () => {
    shiftStore.filters.page = 1;
    fetchData();
  }
);
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Смена" 
        v-model:search="shiftStore.filters.search"
        placeholder="Поиск по имени, номер, дата, склад..."
        :show-add-button="false"
      />

      <ShiftTable
        :items="shiftStore.items"
        :is-loading="shiftStore.isLoading"
      />

      <AppPagination
        v-if="shiftStore.totalItems > 0"
        v-model="shiftStore.filters.page"
        v-model:limit="shiftStore.filters.limit"
        :total="shiftStore.totalItems"
      />
    </div>
  </DashboardLayout>
</template>
