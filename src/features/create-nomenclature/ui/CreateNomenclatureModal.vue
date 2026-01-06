<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { AppModal } from '@/shared/ui/modal';
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
import { useNomenclatureStore } from '@/entities/Nomenclature';
import type { Nomenclature } from '@/entities/Nomenclature';

interface Props {
  show: boolean;
  mode: 'create' | 'view' | 'edit';
  initialData?: Nomenclature | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  initialData: null,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const store = useNomenclatureStore();

const form = ref({
  photo: '',
  name: '',
  unit: '',
  type: 'Продукт' as 'Продукт' | 'Топливо',
  barcode: '',
  price: 0,
});

const errors = ref({
  name: '',
  unit: '',
  type: '',
  barcode: '',
  price: '',
});

const title = computed(() => {
    switch (props.mode) {
        case 'create': return 'Создать';
        case 'view': return 'Просмотр';
        case 'edit': return 'Изменить';
        default: return 'Создать';
    }
});

const buttonText = computed(() => {
    switch (props.mode) {
        case 'create': return 'Добавить';
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
            photo: props.initialData.photo || '',
            name: props.initialData.name,
            unit: props.initialData.unit,
            type: props.initialData.type || 'Продукт',
            barcode: props.initialData.barcode || '',
            price: props.initialData.price || 0,
        };
    } else {
      form.value = {
        photo: '',
        name: '',
        unit: '',
        type: 'Продукт',
        barcode: '',
        price: 0,
      };
    }
    errors.value = { name: '', unit: '', type: '', barcode: '', price: '' };
  }
});

const validate = () => {
  let isValid = true;
  errors.value = { name: '', unit: '', type: '', barcode: '', price: '' };

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
  if (props.mode === 'view') {
      // Switch to edit mode logic if needed, or just emit close. 
      // For now, let's treat "View" button as a way to switch to Edit, 
      // but simpler is just to close or do nothing if it's strictly view.
      // However, the button text is "Изменить", so it implies switching to Edit.
      // But for simplicity in this iteration, I'll just save if it's standard edit/create.
  }

  if (!validate()) return;
  
  let success = false;
  if (props.mode === 'create') {
      success = await store.createItem(form.value);
  } else if (props.mode === 'edit') {
      if (props.initialData?.id) {
          success = await store.updateItem(props.initialData.id, form.value);
      }
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
    maxWidth="500px" 
    @close="emit('close')"
  >
    <div class="px-6 py-4 flex flex-col gap-6">
         <AppInput 
          v-model="form.name" 
          label="Имя *" 
          placeholder="Введите имя продукта" 
          :error="errors.name"
          :disabled="isReadOnly"
        />

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
                <label class="text-[13px] font-medium text-[#64748B]">Тип *</label>
                <select 
                    v-model="form.type"
                    class="h-[46px] px-3 w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors"
                >
                    <option value="Продукт">Продукт</option>
                    <option value="Топливо">Топливо</option>
                </select>
                 <span v-if="errors.type" class="text-red-500 text-xs">{{ errors.type }}</span>
            </div>

            <AppInput 
              v-model="form.unit" 
              label="Единица *" 
              placeholder="кг, литр, шт" 
              :error="errors.unit"
              :disabled="isReadOnly"
            />
        </div>

        <AppInput 
          v-model="form.barcode" 
          label="Barcode *" 
          placeholder="Введите Barcode" 
          :error="errors.barcode"
          :disabled="isReadOnly"
        />

        <div class="grid grid-cols-2 gap-4">
             <AppInput 
              v-model="form.price" 
              type="number"
              label="Цена" 
              placeholder="0.00" 
              :error="errors.price"
              :disabled="isReadOnly"
            />
            
            <AppInput 
              v-model="form.photo" 
              label="Фото (URL)" 
              placeholder="https://..." 
              :disabled="isReadOnly"
            />
        </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <AppButton 
          variant="secondary" 
          class="w-full sm:w-auto h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-8"
          @click="emit('close')"
        >
          Отмена
        </AppButton>
        <AppButton 
          v-if="mode !== 'view'"
          variant="primary" 
          class="w-full sm:w-auto h-[46px] bg-[#1B3E69] hover:bg-[#153256] px-8 text-white"
          :loading="store.isLoading"
          @click="onSave"
        >
          {{ buttonText }}
        </AppButton>
          <AppButton 
          v-else
          variant="primary" 
          class="w-full sm:w-auto h-[46px] bg-[#1B3E69] hover:bg-[#153256] px-8 text-white"
          @click="emit('close')" 
        >
         Закрыть
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
