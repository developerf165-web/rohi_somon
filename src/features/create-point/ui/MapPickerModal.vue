<script setup lang="ts">
import { ref, watch } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { AppModal } from '@/shared/ui/modal';
import { AppButton } from '@/shared/ui/button';
import { MAP_CONFIG } from '@/shared/config/map';

interface Props {
  show: boolean;
  initialLat?: number | string;
  initialLng?: number | string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', coords: { lat: number; lng: number }): void;
}>();

const zoom = ref(MAP_CONFIG.DEFAULT_ZOOM);
const center = ref<[number, number]>(MAP_CONFIG.DEFAULT_CENTER);
const markerPos = ref<[number, number]>(MAP_CONFIG.DEFAULT_CENTER);

watch(() => props.show, (newShow) => {
  if (newShow) {
    if (props.initialLat && props.initialLng) {
      const lat = Number(props.initialLat);
      const lng = Number(props.initialLng);
      if (!isNaN(lat) && !isNaN(lng)) {
        center.value = [lat, lng];
        markerPos.value = [lat, lng];
      }
    }
  }
});

const onMapClick = (event: any) => {
  const { lat, lng } = event.latlng;
  markerPos.value = [lat, lng];
};

const onSelect = () => {
  emit('select', { lat: markerPos.value[0], lng: markerPos.value[1] });
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
      <l-map
        v-if="show"
        ref="map"
        v-model:zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        class="h-full w-full"
        @click="onMapClick"
      >
        <l-tile-layer
          :url="MAP_CONFIG.TILE_URL"
          :attribution="MAP_CONFIG.ATTRIBUTION"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="markerPos" draggable @moveend="(e: any) => markerPos = [e.target.getLatLng().lat, e.target.getLatLng().lng]"></l-marker>
      </l-map>
    </div>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-6 text-[15px] text-[#1B3E69] font-medium">
          <div>
            <span class="text-[#8DA2C0]">Долгота:</span>
            <span class="ml-2 font-bold">{{ markerPos[1].toFixed(7) }}</span>
          </div>
          <div>
            <span class="text-[#8DA2C0]">Широта:</span>
            <span class="ml-2 font-bold">{{ markerPos[0].toFixed(7) }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <AppButton 
            variant="secondary" 
            class="w-[140px] h-[45px] border-[#C6D6E8] text-[#1B3E69]"
            @click="emit('close')"
          >
            Отмена
          </AppButton>
          <AppButton 
            variant="primary" 
            class="w-[140px] h-[45px] bg-[#1B3E69]"
            @click="onSelect"
          >
            Выбрать
          </AppButton>
        </div>
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
