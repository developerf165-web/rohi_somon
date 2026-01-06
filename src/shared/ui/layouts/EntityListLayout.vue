<script setup lang="ts">
import { PageHeader } from '@/shared/ui/PageHeader';
import { AppPagination } from '@/shared/ui/AppPagination';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';

interface Props {
  title: string;
  searchPlaceholder?: string;
  searchValue?: string;
  totalItems?: number;
  page?: number;
  limit?: number;
  loading?: boolean;
  showFilter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Поиск...',
  totalItems: 0,
  page: 1,
  limit: 10,
  loading: false,
  showFilter: false,
});

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'filter'): void;
  (e: 'update:search', value: string): void;
  (e: 'update:page', value: number): void;
  (e: 'update:limit', value: number): void;
}>();

const onSearchUpdate = (value: string) => {
    emit('update:search', value);
}

const onPageUpdate = (value: number) => {
    emit('update:page', value);
}

const onLimitUpdate = (value: number) => {
    emit('update:limit', value);
}
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
       <!-- Header -->
       <PageHeader 
         :title="title" 
         :search="searchValue"
         :placeholder="searchPlaceholder"
         :show-filter="showFilter"
         @update:search="onSearchUpdate"
         @add="emit('add')"
         @filter="emit('filter')"
       >
         <template #actions>
            <slot name="actions"></slot>
         </template>
       </PageHeader>

      <!-- Content (Table) -->
      <div class="relative min-h-[200px]">
          <!-- Loading Overlay -->
          <div v-if="loading" class="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <!-- Spinner could go here -->
          </div>

          <slot></slot>
      </div>

      <!-- Pagination -->
      <AppPagination
        v-if="totalItems > 0"
        :model-value="page"
        @update:model-value="onPageUpdate"
        :limit="limit"
        @update:limit="onLimitUpdate"
        :total="totalItems"
      />

      <!-- Modals Slot -->
      <slot name="modals"></slot>
    </div>
  </DashboardLayout>
</template>
