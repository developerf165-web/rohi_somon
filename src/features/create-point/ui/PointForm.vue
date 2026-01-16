<script setup lang="ts">
import { AppInput } from '@/shared/ui/input';
import AppTextarea from '@/shared/ui/textarea/AppTextarea.vue';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { FormActions } from '@/shared/ui/form';
import { MapPin, ArrowLeft } from 'lucide-vue-next';
import { usePointForm } from '../model/usePointForm';
import MapPickerModal from './MapPickerModal.vue';
import PointMap from './PointMap.vue';
import { ref, onMounted, computed } from 'vue';
import { usePointStore } from '@/entities/Point';
import { MAP_CONFIG } from '@/shared/config/map';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view' | 'map';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const { form, isLoading, errors, onSave, onCancel } = usePointForm();
const pointStore = usePointStore();
const isMapModalOpen = ref(false);
const existingImages = ref<string[]>([]);

const isReadOnly = computed(() => props.mode === 'view');
const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Изменить точку';
    case 'view': return 'Просмотр точки';
    case 'map': return 'Карта';
    default: return 'Добавить';
  }
});

const breadcrumbTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Изменить точку';
    case 'view': return 'Просмотр точки';
    case 'map': return 'Карта';
    default: return 'Добавить точку';
  }
});

const handleCoordsSelect = (coords: { lat: number; lng: number }) => {
  if (isReadOnly.value) return;
  form.lat = coords.lat.toFixed(6);
  form.lng = coords.lng.toFixed(6);
};

const combinedCoords = computed({
  get: () => {
    if (!form.lat || !form.lng) return '';
    return `${form.lng}, ${form.lat}`;
  },
  set: () => {
    // This is mostly for display/reset, we use map picker for setting
  }
});



const loadData = async () => {
  if (!props.id) return;
  
  let point = pointStore.points.find(p => p.id == props.id);
  
  if (!point) {
    await pointStore.fetchPoints();
    point = pointStore.points.find(p => p.id == props.id);
  }

  if (point) {
    form.title = point.title;
    form.address = point.address || '';
    form.lat = point.lat || MAP_CONFIG.DEFAULT_CENTER[0].toString(); 
    form.lng = point.lng || MAP_CONFIG.DEFAULT_CENTER[1].toString();
    form.comment = point.comment || '';
    existingImages.value = point.images || (point.image ? [point.image] : []);
  }
};

onMounted(() => {
  if (props.mode !== 'add') {
    loadData();
    if (props.mode === 'map') {
      isMapModalOpen.value = true;
    }
  }
});

// Update save handler for edit mode
const handleSave = async () => {
  if (props.mode === 'edit') {
    // Logic to update point would go here
    // pointStore.updatePoint({...form, id: props.id});
    // For now we reuse onSave which creates a new one, but ideally we'd separate it.
    // Since API is mock, let's just create (or simulate update) then go back.
    await onSave(); 
  } else {
    await onSave();
  }
};
</script>

<template>
  <EntityFormLayout 
    :title="pageTitle" 
    parent-title="Точки" 
    parent-route="/points"
    :breadcrumb-title="breadcrumbTitle"
    :loading="isLoading"
  >
    <!-- Form Content -->
    <div v-if="mode !== 'map'" class="space-y-8">
      <!-- Main Inputs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AppInput
          v-model="form.title"
          label="Названия *"
          placeholder="Введите название"
          :error="errors.title"
          :disabled="isReadOnly"
        />

        <AppInput
          v-model="combinedCoords"
          label="Долгота / Широта *"
          placeholder="Выберите долготу и широту"
          :error="errors.lng || errors.lat"
          :disabled="true"
          class="cursor-pointer"
          @click="!isReadOnly && (isMapModalOpen = true)"
        >
          <template #append>
            <button 
              type="button" 
              @click.stop="!isReadOnly && (isMapModalOpen = true)" 
              class="hover:text-primary-500 transition-colors" 
              :disabled="isReadOnly"
            >
              <MapPin :size="16" />
            </button>
          </template>
        </AppInput>

        <AppInput
          v-model="form.address"
          label="Адрес *"
          placeholder="Введите адрес"
          :error="errors.address"
          :disabled="isReadOnly"
        />
      </div>

      <!-- Files and Comments Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-8 flex flex-col gap-1 h-[150px]">
          <label class="text-[16px] font-bold text-[#1B3E69]">Фото</label>
          <AppFileUpload 
            class="flex-1" 
            :disabled="isReadOnly" 
            :existing-files="existingImages"
            :max-files="10"
            accept="image/*"
            @update:data-urls="(urls) => form.images = urls"
          />
        </div>
        <div class="lg:col-span-4 flex flex-col gap-1 h-[150px]">
          <label class="text-[16px] font-bold text-[#1B3E69]">Комментария</label>
          <AppTextarea
            v-model="form.comment"
            placeholder="Напишите что-нибудь..."
            class="flex-1"
            :disabled="isReadOnly"
          />
        </div>
      </div>

      <!-- Actions -->
      <FormActions 
        :is-loading="isLoading" 
        @save="handleSave" 
        @cancel="onCancel" 
        :hide-save="isReadOnly"
      />
    </div>

    <!-- Map View -->
    <div v-if="mode === 'map'" class="h-[calc(100vh-200px)] w-full rounded-[10px] overflow-hidden relative border border-[#C6D6E8]">
      <div class="absolute top-4 left-4 z-[1000]">
         <button 
          @click="onCancel"
          class="bg-white text-[#1B3E69] px-4 py-2 rounded shadow-md font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft :size="18" />
          Назад
        </button>
      </div>
      <PointMap
        :lat="form.lat"
        :lng="form.lng"
        :readonly="true"
      />
    </div>

    <!-- Map Modal for Picker -->
    <MapPickerModal
      :show="isMapModalOpen"
      :initial-lat="form.lat"
      :initial-lng="form.lng"
      @close="isMapModalOpen = false"
      @select="handleCoordsSelect"
      :readonly="false" 
    />
  </EntityFormLayout>
</template>

<style scoped>
/* No more deep padding overrides needed thanks to slot support in AppInput */
</style>

