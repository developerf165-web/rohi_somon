<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useScheduleStore } from '@/entities/Schedule';
import { SchedulesTable } from '@/widgets/SchedulesTable';
import { SchedulesHeader } from '@/widgets/SchedulesHeader';
import { AppPagination } from '@/shared/ui/AppPagination';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';

const store = useScheduleStore();

const router = useRouter();

const onAdd = () => {
  router.push('/schedules/add');
};

const onView = (id: number | string) => {
  console.log('View', id);
};

const onEdit = (id: number | string) => {
  console.log('Edit', id);
};

const onDelete = (id: number | string) => {
  console.log('Delete', id);
};

// Pagination props (mocked for now, connected to store)
const currentPage = computed({
  get: () => store.filters.page,
  set: (val) => store.filters.page = val
});
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6">
      <SchedulesHeader 
        v-model:searchModel="store.searchQuery"
        @add="onAdd"
      />

      <SchedulesTable 
        :schedules="store.filteredSchedules"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
      />

      <!-- Pagination -->
      <div v-if="store.totalSchedules > 0" class="mt-4">
        <AppPagination
          v-model="currentPage"
          :total="store.totalSchedules"
          :limit="store.filters.limit"
        />
      </div>
    </div>
  </DashboardLayout>
</template>
