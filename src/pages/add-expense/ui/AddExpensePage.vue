<script setup lang="ts">
import ExpenseForm from '@/features/create-expense/ui/ExpenseForm.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

withDefaults(defineProps<Props>(), {
  mode: 'add',
});
</script>

<template>
  <ExpenseForm :id="id" :mode="mode" />
</template>
