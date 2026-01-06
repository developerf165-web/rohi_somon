<script setup lang="ts">
/**
 * SupplierPage.vue
 * Саҳифаи асосии таъминкунандагон.
 * Вазифаҳо:
 * - Намоиши рӯйхати таъминкунандагон дар шакли сетка (Grid)
 * - Ҷустуҷӯ ва филтратсия
 * - Идоракунии несткунӣ тавассути DeleteSupplierModal
 */
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SupplierGrid from '@/widgets/SupplierGrid/ui/SupplierGrid.vue';
import { useSupplierStore } from '@/entities/Supplier/model/store';
import { EntityListLayout } from '@/shared/ui/layouts';
import DeleteSupplierModal from '@/features/delete-supplier/ui/DeleteSupplierModal.vue';

const store = useSupplierStore();
const router = useRouter();

const isDeleteModalOpen = ref(false);
const supplierToDeleteId = ref<number | string | null>(null);

onMounted(() => {
  store.fetchSuppliers();
});

const onAdd = () => {
    router.push('/suppliers/add');
};

const onView = (id: number | string) => {
    router.push(`/suppliers/view/${id}`);
};

const onEdit = (id: number | string) => {
    router.push(`/suppliers/edit/${id}`);
};

const onDelete = (id: number | string) => {
  supplierToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDeleteConfirm = async () => {
  if (supplierToDeleteId.value) {
    const success = await store.deleteSupplier(supplierToDeleteId.value);
    if (success) {
      isDeleteModalOpen.value = false;
      supplierToDeleteId.value = null;
    }
  }
};
</script>

<template>
  <EntityListLayout
    title="Поставщики"
    v-model:search="store.filters.search"
    placeholder="Поиск по имени"
    :loading="store.isLoading"
    @add="onAdd"
  >
    <!-- Error Message -->
    <div v-if="store.error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ store.error }}
    </div>

    <!-- Grid -->
    <SupplierGrid
      v-else
      :suppliers="store.filteredSuppliers"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <!-- Modals -->
    <template #modals>
      <DeleteSupplierModal
        :show="isDeleteModalOpen"
        :is-loading="store.isLoading"
        @close="isDeleteModalOpen = false"
        @confirm="handleDeleteConfirm"
      />
    </template>
  </EntityListLayout>
</template>

