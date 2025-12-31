<script setup lang="ts">
import { ref } from 'vue';

import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { VacationsHeader } from '@/widgets/VacationsHeader';
import { VacationsTable } from '@/widgets/VacationsTable';
import { AppPagination } from '@/shared/ui/AppPagination';
import { useVacationStore } from '@/entities/Vacation';
import { AddVacationDrawer } from '@/features/AddVacation';
import { DeleteVacationModal } from '@/features/DeleteVacation';
import type { Vacation } from '@/entities/Vacation';

const vacationStore = useVacationStore();
const isDrawerOpen = ref(false);
const drawerMode = ref<'add' | 'view' | 'edit'>('add');
const selectedVacation = ref<Vacation | null>(null);

const onAdd = () => {
  selectedVacation.value = null;
  drawerMode.value = 'add';
  isDrawerOpen.value = true;
};

const onView = (id: number | string) => {
  const vacation = vacationStore.vacations.find(v => v.id === Number(id));
  if (vacation) {
    selectedVacation.value = vacation;
    drawerMode.value = 'view';
    isDrawerOpen.value = true;
  }
};

const onEdit = (id: number | string) => {
  console.log('onEdit received id:', id, typeof id);
  const vacation = vacationStore.vacations.find(v => v.id === Number(id));
  console.log('Found vacation:', vacation);
  if (vacation) {
    selectedVacation.value = vacation;
    drawerMode.value = 'edit';
    isDrawerOpen.value = true;
  }
};

const isDeleteModalOpen = ref(false);
const vacationToDeleteId = ref<number | null>(null);

const onDelete = (id: number | string) => {
  console.log('onDelete received id:', id);
  vacationToDeleteId.value = Number(id);
  isDeleteModalOpen.value = true;
};

const onConfirmDelete = () => {
  if (vacationToDeleteId.value !== null) {
    vacationStore.removeVacation(vacationToDeleteId.value);
    isDeleteModalOpen.value = false;
    vacationToDeleteId.value = null;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-8">
      <VacationsHeader 
        v-model:searchModel="vacationStore.searchQuery" 
        @add="onAdd"
      />
      
      <VacationsTable 
        :vacations="vacationStore.filteredVacations"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <AppPagination
        v-model="vacationStore.filters.page"
        v-model:limit="vacationStore.filters.limit"
        :total="vacationStore.totalVacations"
      />

      <AddVacationDrawer
        :show="isDrawerOpen"
        :mode="drawerMode"
        :initial-data="selectedVacation"
        @close="isDrawerOpen = false"
        @save="isDrawerOpen = false"
      />

      <DeleteVacationModal
        :show="isDeleteModalOpen"
        @close="isDeleteModalOpen = false"
        @confirm="onConfirmDelete"
      />
    </div>
  </DashboardLayout>
</template>
