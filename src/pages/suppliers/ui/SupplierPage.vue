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
import SupplierGrid from '@/widgets/SupplierGrid/ui/SupplierGrid.vue';
import { useSupplierStore } from '@/entities/Supplier/model/store';
import { EntityListLayout } from '@/shared/ui/layouts';
import DeleteSupplierModal from '@/features/delete-supplier/ui/DeleteSupplierModal.vue';
import SupplierModal from '@/features/create-supplier/ui/SupplierModal.vue';
import type { Supplier } from '@/entities/Supplier/model/types';

const store = useSupplierStore();

const isDeleteModalOpen = ref(false);
const supplierToDeleteId = ref<number | string | null>(null);

const isFormModalOpen = ref(false);
const formModalMode = ref<'add' | 'edit' | 'view'>('add');
const selectedSupplier = ref<Supplier | null>(null);

onMounted(() => {
  store.fetchSuppliers();
});

const onAdd = () => {
  formModalMode.value = 'add';
  selectedSupplier.value = null;
  isFormModalOpen.value = true;
};

const onView = (id: number | string) => {
  const supplier = store.suppliers.find(s => s.id === id);
  if (supplier) {
    selectedSupplier.value = supplier;
    formModalMode.value = 'view';
    isFormModalOpen.value = true;
  }
};

const onEdit = (id: number | string) => {
  const supplier = store.suppliers.find(s => s.id === id);
  if (supplier) {
    selectedSupplier.value = supplier;
    formModalMode.value = 'edit';
    isFormModalOpen.value = true;
  }
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

      <SupplierModal
        :show="isFormModalOpen"
        :mode="formModalMode"
        :initial-data="selectedSupplier"
        @close="isFormModalOpen = false"
        @saved="store.fetchSuppliers()"
      />
    </template>
  </EntityListLayout>
</template>

