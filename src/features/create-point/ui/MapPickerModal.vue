<script setup lang="ts">
import { ref } from 'vue';
import { AppModal } from '@/shared/ui/modal';
import { AppButton } from '@/shared/ui/button';
import PointMap from './PointMap.vue';

interface Props {
  show: boolean;
  initialLat?: number | string;
  initialLng?: number | string;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', coords: { lat: number; lng: number }): void;
}>();

const currentCoords = ref<{ lat: number; lng: number } | null>(null);

const onCoordsUpdate = (coords: { lat: number; lng: number }) => {
  currentCoords.value = coords;
};

const onSelect = () => {
  if (props.readonly || !currentCoords.value) {
    if (props.initialLat && props.initialLng) {
      // Fallback to initial if nothing moved
      emit('select', { lat: Number(props.initialLat), lng: Number(props.initialLng) });
    }
    emit('close');
    return;
  }
  emit('select', currentCoords.value);
  emit('close');
};
</script>

<template>
  <AppModal 
    :show="show" 
    title="Карта" 
    maxWidth="750px"
    @close="emit('close')"
  >
    <div class="h-[350px] w-full relative">
      <PointMap
        v-if="show"
        :lat="initialLat"
        :lng="initialLng"
        :readonly="readonly"
        @update:coords="onCoordsUpdate"
      />
    </div>

    <template #footer>
      <div class="flex items-center justify-end w-full gap-3">
        <AppButton 
          variant="secondary" 
          class="w-[140px] h-[45px] border-[#C6D6E8] text-[#1B3E69]"
          @click="emit('close')"
        >
          {{ readonly ? 'Закрыть' : 'Отмена' }}
        </AppButton>
        <AppButton 
          v-if="!readonly"
          variant="primary" 
          class="w-[140px] h-[45px] bg-[#1B3E69]"
          @click="onSelect"
        >
          Выбрать
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>


<style>
/* Leaflet marker icon fix for Vite */
.leaflet-default-icon-path {
  background-image: url(leaflet/dist/images/marker-icon.png);
}
</style>
