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
    title="Расписания"
    placeholder="Поиск по имени..."
    @add="$emit('add')"
  />
</template>
