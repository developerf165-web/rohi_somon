<script setup lang="ts">
import { computed } from 'vue';
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { FormActions } from '@/shared/ui/form';
import { useNomenclatureStore } from '@/entities/Nomenclature';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import { useEntityForm } from '@/shared/composables/useEntityForm';

import { NOMENCLATURE_TYPES, UNIT_OPTIONS } from '@/shared/constants/nomenclature';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const store = useNomenclatureStore();

const { 
  form, 
  errors, 
  isReadOnly, 
  handleSave, 
  goBack 
} = useEntityForm({
  store,
  id: props.id,
  mode: props.mode,
  backRoute: '/nomenclature',
  initialState: {
    photo: '',
    name: '',
    unit: '',
    category: '',
    type: 'Продукт' as 'Продукт' | 'Топливо',
    barcode: '',
    price: 0,
    comment: '',
  }
});

const typeOptions = NOMENCLATURE_TYPES;
const unitOptions = UNIT_OPTIONS;

const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Изменить';
    case 'view': return 'Просмотр';
    default: return 'Добавить';
  }
});

const validate = () => {
  let isValid = true;
  errors.value = {}; // Clear errors

  if (!form.value.name) {
    errors.value.name = 'Введите название';
    isValid = false;
  }
  
  if (!form.value.unit) {
    errors.value.unit = 'Введите ед. изм.';
    isValid = false;
  }

  if (!form.value.type) {
      errors.value.type = 'Выберите тип';
      isValid = false;
  }

  if (!form.value.barcode) {
      errors.value.barcode = 'Введите Barcode';
      isValid = false;
  }

  if (form.value.price < 0) {
      errors.value.price = 'Цена не может быть отрицательной';
      isValid = false;
  }
  return isValid;
};

const onSave = async () => {
  await handleSave(validate);
};
</script>

<template>
  <EntityFormLayout 
    :title="pageTitle" 
    parent-title="Номенклатура" 
    parent-route="/nomenclature" 
    :loading="store.isLoading"
  >
      <!-- Main Inputs Grid - 3 Columns according to the latest Screenshot -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <!-- Row 1 -->
        <AppInput
          v-model="form.name"
          label="Имя продукта *"
          placeholder="Введите имя"
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <AppSelect
            v-model="form.unit"
            label="Единица *"
            placeholder="Выберите единицу"
            :options="unitOptions"
            :error="errors.unit"
            :disabled="isReadOnly"
        />

        <AppSelect
            v-model="form.type"
            label="Тип *"
            placeholder="Выберите тип"
            :options="typeOptions"
            :error="errors.type"
            :disabled="isReadOnly"
        />

        <!-- Row 2 -->
        <AppInput
          v-model="form.barcode"
          label="Barcode"
          placeholder="Введите имя"
          :error="errors.barcode"
          :disabled="isReadOnly"
        />

        <AppFileUpload
          variant="input"
          label="Фото"
          placeholder="Выберите фото"
          :disabled="isReadOnly"
          :existing-files="form.photo ? [form.photo] : []"
          @update:data-urls="(urls: string[]) => form.photo = urls[0] || ''"
        />

        <AppInput
          v-model="form.comment"
          label="Коментарии"
          placeholder="Введите коментарии"
          :disabled="isReadOnly"
        />
      </div>

      <!-- Photo Preview Section -->
      <div v-if="form.photo" class="mt-8 space-y-2">
        <label class="text-[15px] font-bold leading-none text-[#1B3E69]">Фото</label>
        <div class="w-[180px] h-[180px] rounded-xl border border-[#C6D6E8] bg-white overflow-hidden flex items-center justify-center">
            <template v-if="form.photo">
                <img 
                    v-if="typeof form.photo === 'string'" 
                    :src="form.photo" 
                    alt="Preview" 
                    class="w-full h-full object-cover"
                />
            </template>
            <div v-else class="text-[#8DA2C0] text-sm">Нет фото</div>
        </div>
      </div>

      <!-- Actions -->
      <FormActions 
        :is-loading="store.isLoading" 
        @save="onSave" 
        @cancel="goBack" 
        :hide-save="isReadOnly"
      />
  </EntityFormLayout>
</template>
