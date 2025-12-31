<script setup lang="ts">
import { PageHeader } from '@/shared/ui/PageHeader';

const searchModel = defineModel<string>('searchModel', { default: '' });

defineEmits<{
  (e: 'add'): void;
}>();
</script>

<template>
  <PageHeader
    v-model:search="searchModel"
    title="Отпуска, отгулы"
    placeholder="Поиск по имени, тип..."
    @add="$emit('add')"
  />
</template>
