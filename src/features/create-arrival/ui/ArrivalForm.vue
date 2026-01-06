<script setup lang="ts">
/**
 * ArrivalForm.vue
 * Основная форма прихода, разделенная на подкомпоненты для лучшей поддержки.
 */
import { computed } from 'vue';
import { AppButton } from '@/shared/ui/button';
import { useEntityForm } from '@/shared/composables/useEntityForm';
import { useArrivalStore, type Arrival, type ArrivalItem } from '@/entities/Arrival';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import ArrivalHeaderFields from './ArrivalHeaderFields.vue';
import ArrivalItemsTable from './ArrivalItemsTable.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const arrivalStore = useArrivalStore();

// Начальное состояние согласно интерфейсу Arrival
const initialState: Omit<Arrival, 'id'> = {
  date: new Date().toLocaleDateString('ru-RU'),
  supplierId: '',
  skladId: '',
  totalPrice: 0,
  docNumber: '',
  items: [] as ArrivalItem[]
};

const { 
  form, 
  errors, 
  isReadOnly,
  handleSave: saveEntity, 
  goBack 
} = useEntityForm({
  id: props.id,
  mode: props.mode,
  store: arrivalStore,
  initialState,
  backRoute: '/arrival'
});

const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Редактировать приход';
    case 'view': return 'Просмотр прихода';
    default: return 'Добавить приход';
  }
});

// Обновление общего итога
const updateGrandTotal = () => {
  const total = form.value.items.reduce((sum: number, item: ArrivalItem) => sum + (item.totalPrice || 0), 0);
  form.value.totalPrice = Number(total.toFixed(2));
};

const validate = () => {
    let valid = true;
    errors.value = {};
    
    if (!form.value.supplierId) {
        errors.value.supplierId = 'Обязательное поле';
        valid = false;
    }
    if (!form.value.skladId) {
        errors.value.skladId = 'Обязательное поле';
        valid = false;
    }
    
    return valid;
};

const onSave = async () => {
    await saveEntity(validate);
};
</script>

<template>
  <EntityFormLayout 
    :title="pageTitle" 
    parent-title="Приход" 
    parent-route="/arrival"
    :loading="arrivalStore.isLoading"
  >
    <div class="space-y-6 pt-2">
      <!-- 1. Top row fields (Date, Supplier, Sklad) -->
      <ArrivalHeaderFields 
        :form="form" 
        :errors="errors" 
        :is-read-only="isReadOnly" 
      />

      <!-- 2. Items Table Section -->
      <ArrivalItemsTable 
        :items="form.items" 
        :is-read-only="isReadOnly"
        @update:total="updateGrandTotal"
      />

      <!-- 3. Footer Actions -->
      <div class="flex justify-end gap-3 pt-6">
        <AppButton
          variant="secondary"
          class="h-12 px-14 border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 transition-all rounded-[10px] text-[16px] font-bold"
          @click="goBack"
        >
          Отмена
        </AppButton>
        <AppButton
          v-if="!isReadOnly"
          variant="primary"
          class="h-12 px-14 bg-[#1B3E69] text-white hover:bg-[#152F50] transition-all rounded-[10px] text-[16px] font-bold shadow-sm"
          :loading="arrivalStore.isLoading"
          @click="onSave"
        >
          Сохранить
        </AppButton>
      </div>
    </div>
  </EntityFormLayout>
</template>
