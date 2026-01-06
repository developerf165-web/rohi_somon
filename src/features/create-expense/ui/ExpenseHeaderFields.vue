<script setup lang="ts">
import { computed, ref } from 'vue';
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import SelectSkladModal from '@/features/create-arrival/ui/SelectSkladModal.vue';
import { useSkladStore } from '@/entities/Sklad';

interface Props {
  form: {
    date: string;
    fromSkladId: string | number;
    toSkladId: string | number;
  };
  errors: Record<string, string>;
  isReadOnly?: boolean;
}

const props = defineProps<Props>();

const skladStore = useSkladStore();

const isSelectFromSkladModalOpen = ref(false);
const isSelectToSkladModalOpen = ref(false);

const skladOptions = computed(() => 
  skladStore.items.map(s => ({ value: s.id, label: s.name }))
);

const onFromSkladSelect = (sklad: any) => {
  props.form.fromSkladId = sklad.id;
  isSelectFromSkladModalOpen.value = false;
};

const onToSkladSelect = (sklad: any) => {
  props.form.toSkladId = sklad.id;
  isSelectToSkladModalOpen.value = false;
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Date Input -->
    <AppInput
      v-model="form.date"
      label="Дата поступления *"
      placeholder="дд.мм.гггг"
      :error="errors.date"
      :disabled="isReadOnly"
      class="custom-bg-input"
    />

    <!-- From Sklad Selection -->
    <div class="relative">
      <AppSelect
        v-model="form.fromSkladId"
        label="Из склада *"
        :options="skladOptions"
        placeholder="Выберите склад"
        :error="errors.fromSkladId"
        :disabled="isReadOnly"
        class="custom-bg-select"
      />
      <!-- Overlay to trigger modal -->
      <div 
        v-if="!isReadOnly"
        class="absolute inset-0 top-[26px] cursor-pointer"
        @click="isSelectFromSkladModalOpen = true"
      ></div>
    </div>

    <!-- To Sklad Selection -->
    <div class="relative">
      <AppSelect
        v-model="form.toSkladId"
        label="На склад *"
        :options="skladOptions"
        placeholder="Выберите склад"
        :error="errors.toSkladId"
        :disabled="isReadOnly"
        class="custom-bg-select"
      />
      <!-- Overlay to trigger modal -->
      <div 
        v-if="!isReadOnly"
        class="absolute inset-0 top-[26px] cursor-pointer"
        @click="isSelectToSkladModalOpen = true"
      ></div>
    </div>

    <!-- Selection Modals -->
    <SelectSkladModal
      :show="isSelectFromSkladModalOpen"
      @close="isSelectFromSkladModalOpen = false"
      @select="onFromSkladSelect"
    />

    <SelectSkladModal
      :show="isSelectToSkladModalOpen"
      @close="isSelectToSkladModalOpen = false"
      @select="onToSkladSelect"
    />
  </div>
</template>

<style scoped>
:deep(.custom-bg-input input),
:deep(.custom-bg-select select) {
  background-color: #F2F7FB !important;
  border-color: #C6D6E8;
}
</style>
