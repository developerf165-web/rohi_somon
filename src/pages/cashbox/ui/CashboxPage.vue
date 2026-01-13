<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { CashboxTable } from '@/widgets/CashboxTable';
import { useCashboxStore, type Cashbox } from '@/entities/Cashbox';
import { AppPagination } from '@/shared/ui/AppPagination';
import { CreateCashboxDrawer } from '@/features/CreateCashbox';

const cashboxStore = useCashboxStore();
const isAddDrawerOpen = ref(false);
const drawerMode = ref<'add' | 'view' | 'edit'>('add');
const currentItem = ref<Cashbox | null>(null);

const isDeleteModalOpen = ref(false);
const cashboxToDeleteId = ref<number | string | null>(null);

const fetchData = async () => {
  await cashboxStore.fetchCashboxes();
};

onMounted(async () => {
  await fetchData();
});

watch(
  () => [cashboxStore.filters.page, cashboxStore.filters.limit],
  () => fetchData()
);

watch(
  () => cashboxStore.filters.search,
  () => {
    cashboxStore.filters.page = 1;
    fetchData();
  }
);

const onAdd = () => {
  drawerMode.value = 'add';
  currentItem.value = null;
  isAddDrawerOpen.value = true;
};

const onView = (id: string | number) => {
  const item = cashboxStore.items.find(i => i.id == id);
  if (item) {
    drawerMode.value = 'view';
    currentItem.value = { ...item };
    isAddDrawerOpen.value = true;
  }
};

const onEdit = (id: string | number) => {
  const item = cashboxStore.items.find(i => i.id == id);
  if (item) {
    drawerMode.value = 'edit';
    currentItem.value = { ...item };
    isAddDrawerOpen.value = true;
  }
};

const onDelete = (id: string | number) => {
  cashboxToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (cashboxToDeleteId.value) {
    const success = await cashboxStore.deleteCashbox(cashboxToDeleteId.value);
    if (success) {
      isDeleteModalOpen.value = false;
      cashboxToDeleteId.value = null;
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Касса" 
        v-model:search="cashboxStore.filters.search"
        placeholder="Поиск по имени, номер, дата, склад..."
        @add="onAdd"
      />

      <CashboxTable
        :items="cashboxStore.items"
        :is-loading="cashboxStore.isLoading"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <AppPagination
        v-if="cashboxStore.totalItems > 0"
        v-model="cashboxStore.filters.page"
        v-model:limit="cashboxStore.filters.limit"
        :total="cashboxStore.totalItems"
      />

      <CreateCashboxDrawer 
        :show="isAddDrawerOpen" 
        :mode="drawerMode"
        :initial-data="currentItem"
        @close="isAddDrawerOpen = false"
        @save="fetchData"
      />

      <!-- Simple Delete Confirmation (Using standard modal if exists) -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-xl font-bold text-[#1B3E69] mb-4">Удалить кассу?</h3>
          <p class="text-[#3F5575] mb-6">Вы действительно хотите удалить эту кассу? Это действие нельзя отменить.</p>
          <div class="flex justify-end gap-3">
            <button 
              @click="isDeleteModalOpen = false" 
              class="px-5 py-2.5 rounded-lg border border-[#C6D6E8] text-[#3F5575] font-medium hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button 
              @click="confirmDelete" 
              class="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              :disabled="cashboxStore.isLoading"
            >
              {{ cashboxStore.isLoading ? 'Удаление...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
