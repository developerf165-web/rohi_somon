<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { AppModal } from '@/shared/ui/modal';
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { useSupplierStore } from '@/entities/Supplier/model/store';
import type { Supplier } from '@/entities/Supplier/model/types';

interface Props {
  show: boolean;
  mode: 'add' | 'view' | 'edit';
  initialData?: Supplier | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
  initialData: null,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const store = useSupplierStore();

const form = ref({
  name: '',
  phoneNumber: '',
  photo: '',
  comment: '',
  // Keeping these for internal compatibility if needed, though hidden
  type: 'transport' as any,
  address: '',
});

const errors = ref<Record<string, string>>({
  name: '',
  phoneNumber: '',
});

const title = computed(() => {
  switch (props.mode) {
    case 'view': return 'Просмотр поставщика';
    case 'edit': return 'Изменить поставщика';
    default: return 'Создать поставщика';
  }
});

const isReadOnly = computed(() => props.mode === 'view');

watch(() => props.show, (newShow) => {
  if (newShow) {
    if (props.initialData) {
      form.value = {
        name: props.initialData.name || '',
        phoneNumber: props.initialData.phoneNumber || '',
        photo: props.initialData.photo || '',
        comment: props.initialData.comment || '',
        type: props.initialData.type || 'transport',
        address: props.initialData.address || '',
      };
    } else {
      form.value = {
        name: '',
        phoneNumber: '',
        photo: '',
        comment: '',
        type: 'transport',
        address: '',
      };
    }
    errors.value = { name: '', phoneNumber: '' };
  }
});

const validate = () => {
  let isValid = true;
  errors.value = { name: '', phoneNumber: '' };

  if (!form.value.name) {
    errors.value.name = 'Введите имя';
    isValid = false;
  }

  if (!form.value.phoneNumber) {
    errors.value.phoneNumber = 'Введите телефон';
    isValid = false;
  }
  
  return isValid;
};

const onSave = async () => {
  if (isReadOnly.value) {
    emit('close');
    return;
  }

  if (!validate()) return;
  
  let success = false;
  const payload = { ...form.value };

  if (props.mode === 'edit' && props.initialData) {
    success = await store.updateItem(props.initialData.id, payload);
  } else {
    success = await store.createItem(payload as any);
  }
  
  if (success) {
    emit('saved');
    emit('close');
  }
};
</script>

<template>
  <AppModal 
    :show="show" 
    :title="title" 
    maxWidth="800px" 
    @close="emit('close')"
  >
    <div class="px-6 py-6 mt-2 flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <!-- Row 1: Имя and Телефон -->
        <AppInput 
          v-model="form.name" 
          label="Имя *" 
          placeholder="Введите имя" 
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <AppInput 
          v-model="form.phoneNumber" 
          label="Телефон *" 
          placeholder="Введите телефон" 
          :error="errors.phoneNumber"
          :disabled="isReadOnly"
        />

        <!-- Row 2: Фото and Комментарии -->
        <div class="flex flex-col gap-1">
          <label class="text-[16px] font-bold text-[#1B3E69]">Фото</label>
          <AppFileUpload 
            variant="minimal"
            :disabled="isReadOnly" 
            placeholder="Выберите фото"
            :existing-files="form.photo ? [form.photo] : []"
            @update:data-urls="(urls: string[]) => form.photo = urls[0] || ''"
          />
        </div>

        <AppInput
          v-model="form.comment"
          label="Комментарии"
          placeholder="Комментарии"
          :disabled="isReadOnly"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 w-full border-t border-slate-100 pt-5 mt-2">
        <AppButton 
          variant="secondary" 
          class="min-w-[120px] h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-8"
          @click="emit('close')"
        >
          {{ isReadOnly ? 'Назад' : 'Отмена' }}
        </AppButton>
        <AppButton 
          v-if="!isReadOnly"
          variant="primary" 
          class="min-w-[120px] h-[46px] bg-[#1B3E69] hover:bg-[#153256] px-8 text-white"
          :loading="store.isLoading"
          @click="onSave"
        >
          {{ mode === 'add' ? 'Добавить' : 'Сохранить' }}
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
