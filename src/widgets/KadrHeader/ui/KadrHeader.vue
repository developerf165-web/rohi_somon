<script setup lang="ts">
import { PageHeader } from '@/shared/ui/PageHeader';

const searchModel = defineModel<string>('searchModel', { default: '' });

defineEmits<{
  (e: 'add'): void;
  (e: 'filter'): void;
}>();
</script>

<template>
  <PageHeader
    v-model:search="searchModel"
    title="Сотрудники"
    placeholder="Поиск по имени, должность роль"
    show-filter
    @add="$emit('add')"
    @filter="$emit('filter')"
  />
</template>
