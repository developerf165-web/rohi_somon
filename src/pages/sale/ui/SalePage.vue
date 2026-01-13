<script setup lang="ts">
import { onMounted, watch } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SaleTable } from '@/widgets/SaleTable';
import { useSaleStore } from '@/entities/Sale';
import { AppPagination } from '@/shared/ui/AppPagination';

const saleStore = useSaleStore();

const fetchData = async () => {
  await saleStore.fetchSales();
};

onMounted(async () => {
  await fetchData();
});

watch(
  () => [saleStore.filters.page, saleStore.filters.limit],
  () => fetchData()
);

watch(
  () => saleStore.filters.search,
  () => {
    saleStore.filters.page = 1;
    fetchData();
  }
);
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Продажа" 
        v-model:search="saleStore.filters.search"
        placeholder="Поиск по смена, дата, тип..."
        :show-add-button="false"
      />

      <SaleTable
        :items="saleStore.items"
        :is-loading="saleStore.isLoading"
      />

      <AppPagination
        v-if="saleStore.totalItems > 0"
        v-model="saleStore.filters.page"
        v-model:limit="saleStore.filters.limit"
        :total="saleStore.totalItems"
      />
    </div>
  </DashboardLayout>
</template>
