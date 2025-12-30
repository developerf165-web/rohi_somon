<script setup lang="ts">
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { PointForm } from '@/features/create-point';
</script>

<template>
  <DashboardLayout>
    <div class="max-w-[1200px]">
      <PointForm />
    </div>
  </DashboardLayout>
</template>
