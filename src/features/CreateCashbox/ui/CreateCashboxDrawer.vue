<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
import { AppDrawer } from '@/shared/ui/drawer';
import { AppInput, AppSelect } from '@/shared/ui/input';
import { AppCheckbox } from '@/shared/ui/checkbox';
import { AppTextarea } from '@/shared/ui/textarea';
import { FormActions } from '@/shared/ui/form';
import { useCashboxStore, type Cashbox } from '@/entities/Cashbox';
import { useSkladStore } from '@/entities/Sklad';
import SelectSkladModal from '@/features/create-arrival/ui/SelectSkladModal.vue';

interface Props {
  show: boolean;
  mode?: 'add' | 'view' | 'edit';
  initialData?: Cashbox | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
  initialData: null
});

const emit = defineEmits(['close', 'save']);

const cashboxStore = useCashboxStore();
const skladStore = useSkladStore();

const isSelectSkladModalOpen = ref(false);

const form = reactive({
  number: '',
  skladId: '',
  isMain: false,
  description: '',
});

const errors = reactive({
  number: false,
  skladId: false,
});

const title = computed(() => {
  if (props.mode === 'view') return 'Просмотр';
  if (props.mode === 'edit') return 'Редактировать';
  return 'Добавить';
});

const isReadOnly = computed(() => props.mode === 'view');

const skladOptions = computed(() => 
  skladStore.items.map(s => ({
    value: s.id.toString(),
    label: s.name
  }))
);

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.initialData && props.mode !== 'add') {
      form.number = props.initialData.number;
      form.skladId = props.initialData.skladId.toString();
      form.isMain = props.initialData.isMain;
      form.description = props.initialData.description;
    } else {
      form.number = '';
      form.skladId = '';
      form.isMain = false;
      form.description = '';
    }
    
    errors.number = false;
    errors.skladId = false;
    
    if (skladStore.items.length === 0) {
      skladStore.fetchSklads();
    }
  }
});

const onSkladSelect = (sklad: any) => {
  form.skladId = sklad.id.toString();
  isSelectSkladModalOpen.value = false;
};

const onClose = () => {
  emit('close');
};

const onSave = async () => {
  if (isReadOnly.value) return;

  // Validate
  errors.number = !form.number;
  errors.skladId = !form.skladId;

  if (errors.number || errors.skladId) {
    return;
  }

  const selectedSklad = skladStore.items.find(s => s.id.toString() === form.skladId);

  let success = false;
  const payload = {
    number: form.number,
    skladId: form.skladId,
    skladName: selectedSklad?.name || '',
    isMain: form.isMain,
    description: form.description,
  };

  if (props.mode === 'edit' && props.initialData) {
    success = await cashboxStore.updateCashbox(props.initialData.id, payload);
  } else {
    success = await cashboxStore.createCashbox({
      ...payload,
      balance: 0
    });
  }

  if (success) {
    emit('save');
    onClose();
  }
};
</script>

<template>
  <AppDrawer :show="show" :title="title" @close="onClose">
    <div class="flex flex-col gap-5 pt-2">
      <!-- Name (Number) -->
      <AppInput
        v-model="form.number"
        label="Имя"
        placeholder="Введите имя"
        required
        :error="errors.number ? 'Поле обязательно для заполнения' : ''"
        :disabled="isReadOnly"
      />

      <!-- Sklad -->
      <div class="relative">
        <AppSelect
          v-model="form.skladId"
          label="Склад"
          placeholder="Выберите склада"
          :options="skladOptions"
          required
          :error="errors.skladId ? 'Поле обязательно для заполнения' : ''"
          :disabled="isReadOnly"
        />
        <!-- Overlay to trigger modal -->
        <div 
          v-if="!isReadOnly"
          class="absolute inset-0 top-[26px] cursor-pointer"
          @click="isSelectSkladModalOpen = true"
        ></div>
      </div>

      <!-- Main Checkbox -->
      <div class="flex flex-col gap-2">
        <label class="text-[14px] font-bold text-[#1B3E69] leading-none mb-1">
          Главный
        </label>
        <div 
          class="h-[48px] px-4 rounded-lg border border-[#C6D6E8] flex items-center bg-white"
          :class="{ 'opacity-80 bg-gray-50': isReadOnly }"
        >
          <AppCheckbox
            v-model="form.isMain"
            label="Сделать кассу главным"
            :disabled="isReadOnly"
          />
        </div>
      </div>

      <!-- Comment -->
      <AppTextarea
        v-model="form.description"
        label="Комментария"
        placeholder="Напишите что-нибудь..."
        class="min-h-[120px]"
        :disabled="isReadOnly"
      />

      <!-- Actions -->
      <FormActions
        @cancel="onClose"
        @submit="onSave"
        submit-text="Сохранить"
        :cancel-text="isReadOnly ? 'Назад' : 'Отмена'"
        :is-loading="cashboxStore.isLoading"
        :hide-save="isReadOnly"
        class="mt-auto pt-6"
      />
    </div>

    <!-- Modal Selection -->
    <SelectSkladModal
      :show="isSelectSkladModalOpen"
      @close="isSelectSkladModalOpen = false"
      @select="onSkladSelect"
    />
  </AppDrawer>
</template>
