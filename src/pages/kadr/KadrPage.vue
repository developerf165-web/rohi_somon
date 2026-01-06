<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { KadrTable } from '@/widgets/KadrTable';
import { KadrFilterDrawer } from '@/features/KadrFilter';
import { useKadrStore } from '@/entities/Kadr';
import { EntityListLayout } from '@/shared/ui/layouts';

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
  <EntityListLayout
    title="Сотрудники"
    v-model:search="kadrStore.filters.search"
    :total-items="kadrStore.filteredEmployees.length"
    :loading="kadrStore.isLoading"
    :show-filter="true"
    @add="onAdd"
    @filter="onFilter"
  >
      <!-- Error Message -->
      <div v-if="kadrStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        {{ kadrStore.error }}
      </div>
      
      <!-- Table -->
      <KadrTable 
        v-else
        :employees="kadrStore.filteredEmployees"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <!-- Modals -->
      <template #modals>
         <KadrFilterDrawer
            :show="isFilterModalOpen"
            :initial-filters="kadrStore.filters"
            @close="isFilterModalOpen = false"
            @apply="onApplyFilters"
            @reset="onResetFilters"
         />
      </template>
  </EntityListLayout>
</template>
