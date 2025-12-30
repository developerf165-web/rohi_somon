<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PointsHeader } from '@/widgets/PointsHeader';
import { PointGrid } from '@/widgets/PointGrid';
import { useRouter } from 'vue-router';
import { usePointStore } from '@/entities/Point';

const search = ref('');
const pointStore = usePointStore();
const router = useRouter();

onMounted(() => {
  pointStore.fetchPoints();
});

const onAdd = () => {
  router.push('/points/add');
};

const onView = (_id: number | string) => {};
const onEdit = (_id: number | string) => {};
const onDelete = (id: number | string) => {
  if (confirm('Are you sure you want to delete this point?')) {
    pointStore.removePoint(id);
  }
};
const onMap = (_id: number | string) => {};
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-10">
      <PointsHeader 
        v-model:searchModel="search" 
        @add="onAdd" 
      />
      
      <div v-if="pointStore.isLoading" class="flex justify-center py-20">
        <div class="animate-spinner w-10 h-10"></div>
      </div>

      <div v-else-if="pointStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        {{ pointStore.error }}
      </div>
      
      <PointGrid 
        v-else
        :points="pointStore.points"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
        @map="onMap"
      />
    </div>
  </DashboardLayout>
</template>
