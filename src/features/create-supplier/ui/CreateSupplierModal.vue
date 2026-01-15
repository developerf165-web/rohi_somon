<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { AppModal } from '@/shared/ui/modal';
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
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
  address: '', // supplier model has address, but user image shows "Комментарии" which usually maps to address or a separate field. Based on SupplierForm.vue, it has address.
});

const errors = ref({
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

const buttonText = computed(() => {
  switch (props.mode) {
    case 'view': return 'Изменить';
    case 'edit': return 'Сохранить';
    default: return 'Добавить';
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
        address: props.initialData.address || '',
      };
    } else {
      form.value = {
        name: '',
        phoneNumber: '',
        photo: '',
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
  
  return isValid;
};

const onSave = async () => {
  if (props.mode === 'view') {
    // If in view mode, clicking the primary button might switch it to edit mode 
    // but the request said "просмотр ҳам мувофиқи ҳамин сурат".
    // For now, let's just emit close or handle as edit trigger if parent wants.
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

const handleFilesUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file) {
      form.value.photo = file.name;
    }
    // In a real app: upload the file here
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
    <div class="px-6 py-6 flex flex-col gap-6">
      <!-- 2 Column Layout like in the image -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <!-- 1. Name -->
        <AppInput 
          v-model="form.name" 
          label="Имя *" 
          placeholder="Введите имя" 
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <!-- 2. Phone -->
        <AppInput 
          v-model="form.phoneNumber" 
          label="Телефон *" 
          placeholder="Введите телефон" 
          :error="errors.phoneNumber"
          :disabled="isReadOnly"
        />
        
        <!-- 3. Photo -->
        <div class="w-full space-y-1">
          <label class="text-[15px] font-bold leading-none text-[#1B3E69]">Фото</label>
          <div class="relative">
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="handleFilesUpdate"
            />
            <div
              @click="!isReadOnly && ($refs.fileInput as any).click()"
              class="flex h-[46px] w-full rounded-[10px] border border-[#C6D6E8] bg-white px-4 py-2 text-sm items-center cursor-pointer transition-all placeholder:text-[#8DA2C0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1B3E69]"
              :class="{ 'opacity-50 cursor-not-allowed': isReadOnly }"
            >
              <span v-if="form.photo" class="text-[#1B3E69] truncate">
                {{ typeof form.photo === 'string' ? form.photo.split('/').pop() : 'Файл выбран' }}
              </span>
              <span v-else class="text-[#8DA2C0]">{{ isReadOnly ? 'Нет фото' : 'Выберите фото' }}</span>
            </div>
          </div>
        </div>

        <!-- 4. Comments -->
        <AppInput
          v-model="form.address"
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
          class="w-full sm:w-auto h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-12"
          @click="emit('close')"
        >
          {{ isReadOnly ? 'Назад' : 'Отмена' }}
        </AppButton>
        <AppButton 
          v-if="props.mode !== 'view'"
          variant="primary" 
          class="w-full sm:w-auto h-[46px] bg-[#1B3E69] hover:bg-[#153256] px-12 text-white"
          :loading="store.isLoading"
          @click="onSave"
        >
          {{ buttonText }}
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
