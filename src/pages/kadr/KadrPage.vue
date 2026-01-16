<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { KadrTable } from '@/widgets/KadrTable';
import { KadrFilterDrawer } from '@/features/KadrFilter';
import DeleteKadrModal from '@/features/DeleteKadr/ui/DeleteKadrModal.vue';
import { useKadrStore } from '@/entities/Kadr';
import { EntityListLayout } from '@/shared/ui/layouts';

const router = useRouter();
const kadrStore = useKadrStore();
const isFilterModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const itemToDeleteId = ref<number | string | null>(null);

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
  router.push(`/kadr/view/${id}`);
};

const onEdit = (id: number | string) => {
  router.push(`/kadr/edit/${id}`);
};

const onDelete = (id: number | string) => {
  itemToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (itemToDeleteId.value) {
    await kadrStore.deleteItem(itemToDeleteId.value);
    isDeleteModalOpen.value = false;
    itemToDeleteId.value = null;
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
         <DeleteKadrModal
            :show="isDeleteModalOpen"
            :is-loading="kadrStore.isLoading"
            @close="isDeleteModalOpen = false"
            @confirm="confirmDelete"
         />
      </template>
  </EntityListLayout>
</template>
