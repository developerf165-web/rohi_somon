<script setup lang="ts">
/**
 * SupplierForm.vue
 * Форма барои илова ва таҳрири таъминкунанда.
 * Истифода мебарад:
 * - useEntityForm: барои мантиқи универсалии форма (CRUD)
 * - EntityFormLayout: барои дизайни ягонаи формаҳо
 */
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import { AppTextarea } from '@/shared/ui/textarea';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { FormActions } from '@/shared/ui/form';
import { useEntityForm } from '@/shared/composables/useEntityForm';
import { useSupplierStore } from '@/entities/Supplier/model/store';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import { computed } from 'vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const store = useSupplierStore();

// Default empty state matching the Supplier interface structure
const initialState = {
  name: '',
  type: 'transport', // default
  phoneNumber: '',
  address: '',
  photo: '',
  comment: ''
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
  store,
  initialState,
  backRoute: '/suppliers'
});

const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Редактировать поставщика';
    case 'view': return 'Просмотр поставщика';
    default: return 'Добавить поставщика';
  }
});

const typeOptions = [
  { value: 'transport', label: 'Транспорт' },
  { value: 'company', label: 'Компания' }
];

const validate = () => {
    let valid = true;
    errors.value = {};
    
    if (!form.value.name) {
        errors.value.name = 'Обязательное поле';
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
    parent-title="Поставщики" 
    parent-route="/suppliers"
    :loading="store.isLoading"
  >
    <div class="space-y-5">
      <!-- Main Inputs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
        <!-- Name -->
        <AppInput
          v-model="form.name"
          label="Название *"
          placeholder="Введите название"
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <!-- Type -->
        <AppSelect
          v-model="form.type"
          label="Тип"
          :options="typeOptions"
          placeholder="Выберите тип"
          :disabled="isReadOnly"
        />
        
        <!-- Phone -->
        <AppInput
          v-model="form.phoneNumber"
          label="Телефон"
          placeholder="Введите номер телефона"
          :error="errors.phoneNumber"
          :disabled="isReadOnly"
        />

         <!-- Address -->
        <AppInput
          v-model="form.address"
          label="Адрес"
          placeholder="Введите адрес"
          :error="errors.address"
          :disabled="isReadOnly"
        />
      </div>

       <!-- Photo -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div class="flex flex-col gap-1">
          <label class="text-[16px] font-bold text-[#1B3E69]">Фото</label>
          <AppFileUpload 
            class="h-[150px]" 
            :disabled="isReadOnly" 
            :existing-files="form.photo ? [form.photo] : []"
            @update:data-urls="(urls) => form.photo = urls[0] || ''"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[16px] font-bold text-[#1B3E69]">Комментария</label>
          <AppTextarea 
            v-model="form.comment"
            placeholder="Введите комментарий"
            class="h-[150px]"
            :disabled="isReadOnly"
          />
        </div>
      </div>

      <!-- Actions -->
      <!-- Actions -->
      <FormActions 
        :is-loading="store.isLoading" 
        @save="onSave" 
        @cancel="goBack" 
        :hide-save="isReadOnly"
      />
    </div>
  </EntityFormLayout>
</template>
