<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import DeleteSkladModal from '@/features/create-sklad/ui/DeleteSkladModal.vue';
import SkladModal from '@/features/create-sklad/ui/SkladModal.vue';
import { useSkladStore } from '@/entities/Sklad';
import { SkladTable } from '@/widgets/SkladTable';
import { AppPagination } from '@/shared/ui/AppPagination';

const skladStore = useSkladStore();

const isDeleteModalOpen = ref(false);
const skladToDeleteId = ref<number | string | null>(null);

// Sklad Modal State
const isSkladModalOpen = ref(false);
const skladModalMode = ref<'create' | 'view' | 'edit'>('create');
const selectedSklad = ref<any>(null);

const fetch = () => skladStore.fetchSklads();

watch(
  () => [skladStore.filters.page, skladStore.filters.limit],
  () => {
    fetch();
  }
);

watch(
  () => skladStore.filters.search,
  () => {
    skladStore.filters.page = 1;
    fetch();
  }
);

onMounted(() => {
  fetch();
});

const onAdd = () => {
    skladModalMode.value = 'create';
    selectedSklad.value = null;
    isSkladModalOpen.value = true;
};

const onView = (id: string | number) => {
    const item = skladStore.items.find(i => i.id == id);
    if (item) {
        selectedSklad.value = item;
        skladModalMode.value = 'view';
        isSkladModalOpen.value = true;
    }
};

const onEdit = (id: string | number) => {
    const item = skladStore.items.find(i => i.id == id);
    if (item) {
        selectedSklad.value = item;
        skladModalMode.value = 'edit';
        isSkladModalOpen.value = true;
    }
};

const onDelete = (id: string | number) => {
    skladToDeleteId.value = id;
    isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
    if (skladToDeleteId.value) {
        await skladStore.deleteSklad(skladToDeleteId.value);
        isDeleteModalOpen.value = false;
        skladToDeleteId.value = null;
    }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
       <PageHeader 
         title="Склад" 
         v-model:search="skladStore.filters.search"
         placeholder="Поиск по имени"
         @add="onAdd"
       />

      <!-- Table -->
      <SkladTable 
        :items="skladStore.items"
        :is-loading="skladStore.isLoading"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <!-- Pagination -->
      <AppPagination
        v-if="skladStore.totalItems > 0"
        v-model="skladStore.filters.page"
        v-model:limit="skladStore.filters.limit"
        :total="skladStore.totalItems"
      />

      <!-- Modals -->
      <DeleteSkladModal
        :show="isDeleteModalOpen"
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />

      <!-- Sklad Manage Modal -->
      <SkladModal
        :show="isSkladModalOpen"
        :mode="skladModalMode"
        :initial-data="selectedSklad"
        @close="isSkladModalOpen = false"
        @saved="fetch"
        @edit="skladModalMode = 'edit'"
      />
    </div>
  </DashboardLayout>
</template>
