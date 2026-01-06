<script setup lang="ts">
import { computed } from 'vue';
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import { FormActions } from '@/shared/ui/form';
import AppTextarea from '@/shared/ui/textarea/AppTextarea.vue';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { useNomenclatureStore } from '@/entities/Nomenclature';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import { useEntityForm } from '@/shared/composables/useEntityForm';

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
    type: 'Продукт' as 'Продукт' | 'Топливо',
    barcode: '',
    price: 0,
    comment: '',
  }
});

const existingImages = computed(() => form.value.photo ? [form.value.photo] : []);

const typeOptions = [
    { label: 'Продукт', value: 'Продукт' },
    { label: 'Топливо', value: 'Топливо' }
];

const unitOptions = [
    { label: 'кг', value: 'кг' },
    { label: 'литр', value: 'литр' },
    { label: 'шт', value: 'шт' },
    { label: 'м³', value: 'м³' }
];

const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Редактировать';
    case 'view': return 'Просмотр';
    default: return 'Создать';
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
      <!-- Main Inputs Grid - Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppInput
          v-model="form.name"
          label="Имя *"
          placeholder="Введите имя продукта"
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <AppInput
          v-model="form.barcode"
          label="Barcode *"
          placeholder="Введите Barcode"
          :error="errors.barcode"
          :disabled="isReadOnly"
        />

        <AppInput
          v-model="form.price"
          type="number"
          label="Цена"
          placeholder="0.00"
          :error="errors.price"
          :disabled="isReadOnly"
        />
      </div>

       <!-- Main Inputs Grid - Row 2 (Matching Screenshot) -->
       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
       </div>

       <!-- Main Inputs Grid - Row 3 (Matching Screenshot: Photo & Comments) -->
       <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
             <div class="flex flex-col gap-1">
                  <label class="text-[16px] font-bold text-[#1B3E69]">Фото</label>
                  <AppFileUpload 
                    class="h-[150px]" 
                    :disabled="isReadOnly" 
                    :existing-files="existingImages"
                  />
            </div>

             <div class="flex flex-col gap-1">
                  <label class="text-[16px] font-bold text-[#1B3E69]">Коментарии</label>
                   <AppTextarea
                    v-model="form.comment"
                    placeholder="Напишите что-нибудь..."
                    class="h-[150px]"
                    :disabled="isReadOnly"
                  />
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
