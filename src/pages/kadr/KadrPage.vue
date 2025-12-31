<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { KadrHeader } from '@/widgets/KadrHeader';
import { KadrTable } from '@/widgets/KadrTable';
import { KadrFilterDrawer } from '@/features/KadrFilter';
import { useKadrStore } from '@/entities/Kadr';

const router = useRouter();
const kadrStore = useKadrStore();
const isFilterModalOpen = ref(false);

onMounted(() => {
  kadrStore.fetchEmployees();
});

const onAdd = () => {
  router.push('/kadr/add');
};

const onFilter = () => {
  isFilterModalOpen.value = true;
};

const onApplyFilters = (filters: typeof kadrStore.filters) => {
  kadrStore.filters = filters;
  isFilterModalOpen.value = false;
};

const onResetFilters = () => {
  kadrStore.resetFilters();
};

const onView = (id: number | string) => {
  console.log('View', id);
};

const onEdit = (id: number | string) => {
  router.push(`/kadr/edit/${id}`);
};

const onDelete = (id: number | string) => {
  if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
    kadrStore.removeEmployee(id);
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-8">
      <KadrHeader 
        v-model:searchModel="kadrStore.filters.search" 
        @add="onAdd"
        @filter="onFilter"
      />
      
      <div v-if="kadrStore.isLoading" class="flex justify-center py-20">
        <div class="animate-spinner w-10 h-10"></div>
      </div>

      <div v-else-if="kadrStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        {{ kadrStore.error }}
      </div>
      
      <KadrTable 
        v-else
        :employees="kadrStore.filteredEmployees"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <KadrFilterDrawer
        :show="isFilterModalOpen"
        :initial-filters="kadrStore.filters"
        @close="isFilterModalOpen = false"
        @apply="onApplyFilters"
        @reset="onResetFilters"
      />
    </div>
  </DashboardLayout>
</template>
