<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { MAP_CONFIG } from '@/shared/config/map';

interface Props {
  lat?: number | string;
  lng?: number | string;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:coords', coords: { lat: number; lng: number }): void;
}>();

const zoom = ref(MAP_CONFIG.DEFAULT_ZOOM);
const center = ref<[number, number]>(MAP_CONFIG.DEFAULT_CENTER);
const markerPos = ref<[number, number]>(MAP_CONFIG.DEFAULT_CENTER);

const updateMapFromProps = () => {
  if (props.lat && props.lng) {
    const lat = Number(props.lat);
    const lng = Number(props.lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      center.value = [lat, lng];
      markerPos.value = [lat, lng];
    }
  }
};

onMounted(updateMapFromProps);
watch(() => [props.lat, props.lng], updateMapFromProps);

const onMapClick = (event: any) => {
  if (props.readonly) return;
  const { lat, lng } = event.latlng;
  markerPos.value = [lat, lng];
  emit('update:coords', { lat, lng });
};

const onMarkerMoveEnd = (e: any) => {
  if (props.readonly) return;
  const { lat, lng } = e.target.getLatLng();
  markerPos.value = [lat, lng];
  emit('update:coords', { lat, lng });
};
</script>

<template>
  <div class="h-full w-full relative">
    <l-map
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
      <l-marker 
        :lat-lng="markerPos" 
        :draggable="!readonly" 
        @moveend="onMarkerMoveEnd"
      ></l-marker>
    </l-map>

    <!-- Overlay Info (Optional, but nice to have) -->
    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000] flex gap-6 text-[13px] text-[#1B3E69] font-medium border border-gray-200">
      <div>
        <span class="text-[#8DA2C0]">Долгота:</span>
        <span class="ml-2 font-bold">{{ markerPos[1].toFixed(7) }}</span>
      </div>
      <div>
        <span class="text-[#8DA2C0]">Широта:</span>
        <span class="ml-2 font-bold">{{ markerPos[0].toFixed(7) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.leaflet-default-icon-path {
  background-image: url(leaflet/dist/images/marker-icon.png);
}
</style>
