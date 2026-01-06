<script setup lang="ts">
import { computed, ref } from 'vue';
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import SelectSupplierModal from './SelectSupplierModal.vue';
import SelectSkladModal from './SelectSkladModal.vue';
import { useSupplierStore } from '@/entities/Supplier';
import { useSkladStore } from '@/entities/Sklad';

interface Props {
  form: {
    date: string;
    supplierId: string | number;
    skladId: string | number;
  };
  errors: Record<string, string>;
  isReadOnly?: boolean;
}

const props = defineProps<Props>();

const supplierStore = useSupplierStore();
const skladStore = useSkladStore();

const isSelectSupplierModalOpen = ref(false);
const isSelectSkladModalOpen = ref(false);

const supplierOptions = computed(() => 
  supplierStore.suppliers.map(s => ({ value: s.id, label: s.name }))
);

const skladOptions = computed(() => 
  skladStore.items.map(s => ({ value: s.id, label: s.name }))
);

const onSupplierSelect = (supplier: any) => {
  props.form.supplierId = supplier.id;
  isSelectSupplierModalOpen.value = false;
};

const onSkladSelect = (sklad: any) => {
  props.form.skladId = sklad.id;
  isSelectSkladModalOpen.value = false;
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

    <!-- Supplier Selection -->
    <div class="relative">
      <AppSelect
        v-model="form.supplierId"
        label="Поставщик *"
        :options="supplierOptions"
        placeholder="Выберите поставщика"
        :error="errors.supplierId"
        :disabled="isReadOnly"
        class="custom-bg-select"
      />
      <!-- Overlay to trigger modal -->
      <div 
        v-if="!isReadOnly"
        class="absolute inset-0 top-[26px] cursor-pointer"
        @click="isSelectSupplierModalOpen = true"
      ></div>
    </div>

    <!-- Sklad Selection -->
    <div class="relative">
      <AppSelect
        v-model="form.skladId"
        label="Склад *"
        :options="skladOptions"
        placeholder="Выберите склад"
        :error="errors.skladId"
        :disabled="isReadOnly"
        class="custom-bg-select"
      />
      <!-- Overlay to trigger modal -->
      <div 
        v-if="!isReadOnly"
        class="absolute inset-0 top-[26px] cursor-pointer"
        @click="isSelectSkladModalOpen = true"
      ></div>
    </div>

    <!-- Selection Modals -->
    <SelectSupplierModal
      :show="isSelectSupplierModalOpen"
      @close="isSelectSupplierModalOpen = false"
      @select="onSupplierSelect"
    />

    <SelectSkladModal
      :show="isSelectSkladModalOpen"
      @close="isSelectSkladModalOpen = false"
      @select="onSkladSelect"
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
