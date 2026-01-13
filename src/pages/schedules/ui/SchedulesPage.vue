<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useScheduleStore } from '@/entities/Schedule';
import { SchedulesTable } from '@/widgets/SchedulesTable';
import { SchedulesHeader } from '@/widgets/SchedulesHeader';
import { AppPagination } from '@/shared/ui/AppPagination';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';

const store = useScheduleStore();
const router = useRouter();

const isDeleteModalOpen = ref(false);
const scheduleToDeleteId = ref<number | string | null>(null);

const onAdd = () => {
  router.push('/schedules/add');
};

const onView = (id: number | string) => {
  router.push(`/schedules/${id}`);
};

const onEdit = (id: number | string) => {
  router.push(`/schedules/edit/${id}`);
};

const onDelete = (id: number | string) => {
  scheduleToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
  if (scheduleToDeleteId.value) {
    store.removeSchedule(Number(scheduleToDeleteId.value));
    isDeleteModalOpen.value = false;
    scheduleToDeleteId.value = null;
  }
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

      <!-- Delete Confirmation Modal -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-xl font-bold text-[#1B3E69] mb-4">Удалить расписание?</h3>
          <p class="text-[#3F5575] mb-6">Вы действительно хотите удалить это расписание? Это действие нельзя отменить.</p>
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
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
