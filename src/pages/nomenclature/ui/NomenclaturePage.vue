<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DeleteNomenclatureModal from '@/features/create-nomenclature/ui/DeleteNomenclatureModal.vue';
import { useNomenclatureStore } from '@/entities/Nomenclature';
import { NomenclatureTable } from '@/widgets/NomenclatureTable';
import { EntityListLayout } from '@/shared/ui/layouts';

const router = useRouter();
const store = useNomenclatureStore();

const isDeleteModalOpen = ref(false);
const itemToDeleteId = ref<number | string | null>(null);

const fetch = () => store.fetchItems();

watch(
  () => [store.filters.page, store.filters.limit],
  () => {
    fetch();
  }
);

watch(
  () => store.filters.search,
  () => {
    store.filters.page = 1;
    fetch();
  }
);

onMounted(() => {
  fetch();
});

const onAdd = () => {
    router.push('/nomenclature/add');
};

const onView = (id: string | number) => {
    router.push(`/nomenclature/view/${id}`);
};

const onEdit = (id: string | number) => {
    router.push(`/nomenclature/edit/${id}`);
};

const onDelete = (id: string | number) => {
    itemToDeleteId.value = id;
    isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
    if (itemToDeleteId.value) {
        await store.deleteItem(itemToDeleteId.value);
        isDeleteModalOpen.value = false;
        itemToDeleteId.value = null;
    }
};
</script>

<template>
  <EntityListLayout
    title="Номенклатура продуктов"
    search-placeholder="Поиск по имени, barcode ..."
    v-model:search="store.filters.search"
    :total-items="store.totalItems"
    v-model:page="store.filters.page"
    v-model:limit="store.filters.limit"
    :loading="store.isLoading"
    @add="onAdd"
  >
      <!-- Table -->
      <NomenclatureTable 
        :items="store.items"
        :is-loading="store.isLoading"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <!-- Modals -->
      <template #modals>
        <DeleteNomenclatureModal
            :show="isDeleteModalOpen"
            @close="isDeleteModalOpen = false"
            @confirm="confirmDelete"
        />
      </template>
  </EntityListLayout>
</template>
