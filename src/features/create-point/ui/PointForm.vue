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

const { form, isLoading, errors, onSave, onCancel } = usePointForm({ id: props.id, mode: props.mode });
const pointStore = usePointStore();
const isMapModalOpen = ref(false);

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
  form.value.lat = coords.lat.toFixed(6);
  form.value.lng = coords.lng.toFixed(6);
};

const combinedCoords = computed({
  get: () => {
    if (!form.value.lat || !form.value.lng) return '';
    return `${form.value.lng}, ${form.value.lat}`;
  },
  set: () => {
    // This is mostly for display/reset, we use map picker for setting
  }
});

onMounted(() => {
  if (props.mode === 'map') {
    isMapModalOpen.value = true;
  }
});
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
          v-model="form.value.title"
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
          v-model="form.value.address"
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
            :existing-files="form.value.images"
            :max-files="10"
            accept="image/*"
            @update:data-urls="(urls) => form.value.images = urls"
          />
        </div>
        <div class="lg:col-span-4 flex flex-col gap-1 h-[150px]">
          <label class="text-[16px] font-bold text-[#1B3E69]">Комментария</label>
          <AppTextarea
            v-model="form.value.comment"
            placeholder="Напишите что-нибудь..."
            class="flex-1"
            :disabled="isReadOnly"
          />
        </div>
      </div>

      <!-- Actions -->
      <FormActions 
        :is-loading="isLoading" 
        @save="onSave" 
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
        :lat="form.value.lat"
        :lng="form.value.lng"
        :readonly="true"
      />
    </div>

    <!-- Map Modal for Picker -->
    <MapPickerModal
      :show="isMapModalOpen"
      :initial-lat="form.value.lat"
      :initial-lng="form.value.lng"
      @close="isMapModalOpen = false"
      @select="handleCoordsSelect"
      :readonly="false" 
    />
  </EntityFormLayout>
</template>

<style scoped>
/* No more deep padding overrides needed thanks to slot support in AppInput */
</style>

