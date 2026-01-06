<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PointGrid } from '@/widgets/PointGrid';
import { usePointStore } from '@/entities/Point';
import { MAP_CONFIG } from '@/shared/config/map';
import DeletePointModal from '@/features/create-point/ui/DeletePointModal.vue';
import MapPickerModal from '@/features/create-point/ui/MapPickerModal.vue';
import { EntityListLayout } from '@/shared/ui/layouts';

const search = ref('');
const pointStore = usePointStore();
const router = useRouter();

const isDeleteModalOpen = ref(false);
const pointToDeleteId = ref<number | string | null>(null);
const isDeleting = ref(false);

const isMapModalOpen = ref(false);
const selectedMapPoint = ref<{ lat: number|string; lng: number|string } | null>(null);

onMounted(() => {
  pointStore.fetchPoints();
});

const onAdd = () => {
  router.push('/points/add');
};

const onView = (id: number | string) => {
  router.push(`/points/view/${id}`);
};
const onEdit = (id: number | string) => {
  router.push(`/points/edit/${id}`);
};
const onDelete = (id: number | string) => {
  pointToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (pointToDeleteId.value) {
    isDeleting.value = true;
    try {
      await pointStore.removePoint(pointToDeleteId.value);
    } finally {
      isDeleting.value = false;
      isDeleteModalOpen.value = false;
      pointToDeleteId.value = null;
    }
  }
};

const onMap = (id: number | string) => {
  const point = pointStore.points.find(p => p.id == id);
  if (point) {
    // Determine coords (prefer point.lat/lng, fallback to default if missing)
    const lat = point.lat || MAP_CONFIG.DEFAULT_CENTER[0].toString();
    const lng = point.lng || MAP_CONFIG.DEFAULT_CENTER[1].toString();
    selectedMapPoint.value = { lat, lng };
    isMapModalOpen.value = true;
  }
};
</script>

<template>
  <EntityListLayout
    title="Точки"
    v-model:search="search"
    placeholder="Поиск по имени"
    :loading="pointStore.isLoading"
    @add="onAdd"
  >
      <!-- Error Message -->
      <div v-if="pointStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        {{ pointStore.error }}
      </div>
      
      <!-- Grid -->
      <PointGrid 
        v-else
        :points="pointStore.points"
        @view="onView"
        @edit="onEdit"
        @delete="onDelete"
        @map="onMap"
      />

      <!-- Modals -->
      <template #modals>
        <DeletePointModal
            :show="isDeleteModalOpen"
            :is-loading="isDeleting"
            @close="isDeleteModalOpen = false"
            @confirm="confirmDelete"
        />

        <MapPickerModal
            v-if="isMapModalOpen"
            :show="isMapModalOpen"
            :initial-lat="selectedMapPoint?.lat"
            :initial-lng="selectedMapPoint?.lng"
            :readonly="true"
            @close="isMapModalOpen = false"
            @select="() => {}"
        />
      </template>
  </EntityListLayout>
</template>
