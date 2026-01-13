<script setup lang="ts">
import { onMounted, watch } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { EncashmentTable } from '@/widgets/EncashmentTable';
import { useEncashmentStore } from '@/entities/Encashment';
import { AppPagination } from '@/shared/ui/AppPagination';

const encashmentStore = useEncashmentStore();

const fetchData = async () => {
  await encashmentStore.fetchEncashments();
};

onMounted(async () => {
  await fetchData();
});

watch(
  () => [encashmentStore.filters.page, encashmentStore.filters.limit],
  () => fetchData()
);

watch(
  () => encashmentStore.filters.search,
  () => {
    encashmentStore.filters.page = 1;
    fetchData();
  }
);
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Инкассация" 
        v-model:search="encashmentStore.filters.search"
        placeholder="Поиск по смена, дата, тип..."
        :show-add-button="false"
      />

      <EncashmentTable
        :items="encashmentStore.items"
        :is-loading="encashmentStore.isLoading"
      />

      <AppPagination
        v-if="encashmentStore.totalItems > 0"
        v-model="encashmentStore.filters.page"
        v-model:limit="encashmentStore.filters.limit"
        :total="encashmentStore.totalItems"
      />
    </div>
  </DashboardLayout>
</template>
