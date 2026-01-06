<script setup lang="ts">
/**
 * ExpenseForm.vue
 * Основная форма расхода (складского перемещения).
 */
import { computed } from 'vue';
import { AppButton } from '@/shared/ui/button';
import { useEntityForm } from '@/shared/composables/useEntityForm';
import { useExpenseStore, type Expense, type ExpenseItem } from '@/entities/Expense';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import ExpenseHeaderFields from './ExpenseHeaderFields.vue';
import ExpenseItemsTable from './ExpenseItemsTable.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const expenseStore = useExpenseStore();

// Начальное состояние
const initialState: Omit<Expense, 'id'> = {
  date: new Date().toLocaleDateString('ru-RU'),
  fromSkladId: '',
  toSkladId: '',
  totalPrice: 0,
  docNumber: '',
  items: [] as ExpenseItem[]
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
  store: expenseStore,
  initialState,
  backRoute: '/expense'
});

const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Редактировать расход';
    case 'view': return 'Просмотр расхода';
    default: return 'Добавить расход';
  }
});

const updateGrandTotal = () => {
  const total = form.value.items.reduce((sum: number, item: ExpenseItem) => sum + (item.totalPrice || 0), 0);
  form.value.totalPrice = Number(total.toFixed(2));
};

const validate = () => {
    let valid = true;
    errors.value = {};
    
    if (!form.value.fromSkladId) {
        errors.value.fromSkladId = 'Обязательное поле';
        valid = false;
    }
    if (!form.value.toSkladId) {
        errors.value.toSkladId = 'Обязательное поле';
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
    parent-title="Расход" 
    parent-route="/expense"
    :loading="expenseStore.isLoading"
  >
    <div class="space-y-6 pt-2">
      <!-- 1. Top row fields (Date, From Sklad, To Sklad) -->
      <ExpenseHeaderFields 
        :form="form" 
        :errors="errors" 
        :is-read-only="isReadOnly" 
      />

      <!-- 2. Items Table Section -->
      <ExpenseItemsTable 
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
          :loading="expenseStore.isLoading"
          @click="onSave"
        >
          Сохранить
        </AppButton>
      </div>
    </div>
  </EntityFormLayout>
</template>
