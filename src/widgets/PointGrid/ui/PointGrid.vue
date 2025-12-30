<script setup lang="ts">
import { PointCard } from '@/entities/Point';

interface Point {
  id: number | string;
  title: string;
  address: string;
  image?: string;
}

defineProps<{
  points: Point[];
}>();

const emit = defineEmits<{
  (e: 'view', id: number | string): void;
  (e: 'edit', id: number | string): void;
  (e: 'delete', id: number | string): void;
  (e: 'map', id: number | string): void;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
    <PointCard
      v-for="point in points"
      :key="point.id"
      v-bind="point"
      @view="(id) => emit('view', id)"
      @edit="(id) => emit('edit', id)"
      @delete="(id) => emit('delete', id)"
      @map="(id) => emit('map', id)"
    />
  </div>
</template>
