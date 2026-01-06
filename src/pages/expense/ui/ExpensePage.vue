<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ExpenseTable } from '@/widgets/ExpenseTable';
import { useExpenseStore } from '@/entities/Expense';
import { useSkladStore } from '@/entities/Sklad';
import { AppPagination } from '@/shared/ui/AppPagination';
import DeleteExpenseModal from '@/features/delete-expense/ui/DeleteExpenseModal.vue';

const router = useRouter();
const expenseStore = useExpenseStore();
const skladStore = useSkladStore();

const isDeleteModalOpen = ref(false);
const expenseToDeleteId = ref<number | string | null>(null);

const fetchData = async () => {
  await expenseStore.fetchExpenses();
};

onMounted(async () => {
  await Promise.all([
    skladStore.fetchSklads(),
    fetchData()
  ]);
});

watch(
  () => [expenseStore.filters.page, expenseStore.filters.limit],
  () => fetchData()
);

watch(
  () => expenseStore.filters.search,
  () => {
    expenseStore.filters.page = 1;
    fetchData();
  }
);

const onAdd = () => router.push('/expense/add');
const onView = (id: string | number) => router.push(`/expense/view/${id}`);
const onEdit = (id: string | number) => router.push(`/expense/edit/${id}`);

const onDelete = (id: string | number) => {
  expenseToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (expenseToDeleteId.value) {
    const success = await expenseStore.deleteExpense(expenseToDeleteId.value);
    if (success) {
      isDeleteModalOpen.value = false;
      expenseToDeleteId.value = null;
    }
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Расход" 
        v-model:search="expenseStore.filters.search"
        placeholder="Поиск по имени, номер, дата, склад..."
        @add="onAdd"
      />

      <ExpenseTable
        :items="expenseStore.items"
        :is-loading="expenseStore.isLoading"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <AppPagination
        v-if="expenseStore.totalItems > 0"
        v-model="expenseStore.filters.page"
        v-model:limit="expenseStore.filters.limit"
        :total="expenseStore.totalItems"
      />

      <DeleteExpenseModal
        :show="isDeleteModalOpen"
        :is-loading="expenseStore.isLoading"
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />
    </div>
  </DashboardLayout>
</template>
