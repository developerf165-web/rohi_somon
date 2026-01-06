<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import DeleteSkladModal from '@/features/create-sklad/ui/DeleteSkladModal.vue';
import { useSkladStore } from '@/entities/Sklad';
import { SkladTable } from '@/widgets/SkladTable';
import { AppPagination } from '@/shared/ui/AppPagination';

const router = useRouter();
const skladStore = useSkladStore();

const isDeleteModalOpen = ref(false);
const skladToDeleteId = ref<number | string | null>(null);

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
    router.push('/sklad/add');
};

const onView = (id: string | number) => {
    router.push(`/sklad/view/${id}`);
};

const onEdit = (id: string | number) => {
    router.push(`/sklad/edit/${id}`);
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
    </div>
  </DashboardLayout>
</template>
