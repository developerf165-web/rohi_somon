<script setup lang="ts">
/**
 * @page ArrivalPage
 * @description
 * Главная страница раздела "Приход".
 * Отвечает за отображение списка поступлений, фильтрацию и управление удалением.
 * 
 * @uses useArrivalStore - для работы с данными приходов
 * @uses ArrivalTable - основной виджет таблицы
 * @uses DeleteArrivalModal - подтверждение удаления
 */
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ArrivalTable } from '@/widgets/ArrivalTable';
import { useArrivalStore } from '@/entities/Arrival';
import { useSupplierStore } from '@/entities/Supplier';
import { useSkladStore } from '@/entities/Sklad';
import { AppPagination } from '@/shared/ui/AppPagination';
import DeleteArrivalModal from '@/features/delete-arrival/ui/DeleteArrivalModal.vue';

const router = useRouter();

const arrivalStore = useArrivalStore();
const supplierStore = useSupplierStore();
const skladStore = useSkladStore();

const isDeleteModalOpen = ref(false);
const arrivalToDeleteId = ref<number | string | null>(null);

// Загрузка данных
const fetch = async () => {
  await arrivalStore.fetchArrivals();
};

onMounted(async () => {
  // Загружаем зависимости для отображения имен
  await Promise.all([
    supplierStore.fetchSuppliers(),
    skladStore.fetchSklads(),
    fetch()
  ]);
});

// Наблюдение за фильтрами
watch(
  () => [arrivalStore.filters.page, arrivalStore.filters.limit],
  () => fetch()
);

watch(
  () => arrivalStore.filters.search,
  () => {
    arrivalStore.filters.page = 1;
    fetch();
  }
);

const onAdd = () => {
  router.push('/arrival/add');
};

const onView = (id: string | number) => {
  router.push(`/arrival/view/${id}`);
};

const onEdit = (id: string | number) => {
  router.push(`/arrival/edit/${id}`);
};

const onDelete = (id: string | number) => {
  arrivalToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (arrivalToDeleteId.value) {
    const success = await arrivalStore.deleteArrival(arrivalToDeleteId.value);
    if (success) {
      isDeleteModalOpen.value = false;
      arrivalToDeleteId.value = null;
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <PageHeader 
        title="Приход" 
        v-model:search="arrivalStore.filters.search"
        placeholder="Поиск по имени, номер, дата, склад..."
        @add="onAdd"
      />

      <!-- Table Section -->
      <ArrivalTable
        :items="arrivalStore.items"
        :is-loading="arrivalStore.isLoading"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <!-- Pagination -->
      <AppPagination
        v-if="arrivalStore.totalItems > 0"
        v-model="arrivalStore.filters.page"
        v-model:limit="arrivalStore.filters.limit"
        :total="arrivalStore.totalItems"
      />

      <!-- Modals -->
      <DeleteArrivalModal
        :show="isDeleteModalOpen"
        :is-loading="arrivalStore.isLoading"
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />
    </div>
  </DashboardLayout>
</template>
