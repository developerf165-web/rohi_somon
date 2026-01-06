<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { AppModal } from '@/shared/ui/modal';
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
import { AppSelect } from '@/shared/ui/select';
import { useSkladStore } from '@/entities/Sklad';
import { usePointStore } from '@/entities/Point';
import type { Sklad } from '@/entities/Sklad';

interface Props {
  show: boolean;
  mode: 'create' | 'view' | 'edit';
  initialData?: Sklad | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  initialData: null,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const skladStore = useSkladStore();
const pointStore = usePointStore();

const form = ref({
  name: '',
  pointId: '' as string | number,
  type: '' as 'Магазин' | 'GSM' | '',
});

const errors = ref({
  name: '',
  pointId: '',
  type: '',
});

const title = computed(() => {
    switch (props.mode) {
        case 'create': return 'Создать склад';
        case 'view': return 'Просмотр склада';
        case 'edit': return 'Изменить склада'; // Keeping as per screenshot/request, though "Редактировать" is better Russian.
        default: return 'Создать склад';
    }
});

const typeOptions = [
    { label: 'Магазин', value: 'Магазин' },
    { label: 'GSM', value: 'GSM' }
];

const pointOptions = computed(() => {
    return pointStore.points.map(p => ({
        label: p.title,
        value: p.id
    }));
});

const buttonText = computed(() => {
    switch (props.mode) {
        case 'create': return 'Добавить';
        case 'view': return 'Изменить';
        case 'edit': return 'Изменить';
        default: return 'Добавить';
    }
});

onMounted(() => {
    if (pointStore.points.length === 0) {
        pointStore.fetchPoints();
    }
});

watch(() => props.show, (newShow) => {
  if (newShow) {
    if (props.initialData) {
        form.value = {
            name: props.initialData.name,
            pointId: props.initialData.pointId,
            type: props.initialData.type,
        };
    } else {
      form.value = {
        name: '',
        pointId: '',
        type: '',
      };
    }
    errors.value = { name: '', pointId: '', type: '' };
  }
});

const validate = () => {
  let isValid = true;
  errors.value = { name: '', pointId: '', type: '' };

  if (!form.value.name) {
    errors.value.name = 'Введите имя склада';
    isValid = false;
  }
  if (!form.value.type) {
    errors.value.type = 'Выберите тип';
    isValid = false;
  }
  if (!form.value.pointId) {
    errors.value.pointId = 'Выберите точку';
    isValid = false;
  }
  return isValid;
};

const onSave = async () => {
  if (!validate()) return;
  
  if (form.value.type) {
      const success = await skladStore.createSklad({
        name: form.value.name,
        pointId: form.value.pointId,
        type: form.value.type as 'Магазин' | 'GSM',
      });
      
      if (success) {
        emit('saved');
        emit('close');
      }
  }
};
</script>

<template>
  <AppModal 
    :show="show" 
    :title="title" 
    maxWidth="600px" 
    @close="emit('close')"
  >
    <div class="px-6 py-4 flex flex-col gap-6">
      <div class="grid grid-cols-2 gap-6">
        <AppInput 
          v-model="form.name" 
          label="Имя склада *" 
          placeholder="Введите имя" 
          :error="errors.name"
        />
        
        <AppSelect
            v-model="form.type"
            label="Тип *"
            placeholder="Выберите тип"
            :options="typeOptions"
            :error="errors.type"
        />
      </div>
      
       <AppSelect
            v-model="form.pointId"
            label="Точка *"
            placeholder="Выберите точку"
            :options="pointOptions"
            :error="errors.pointId"
        />
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
          variant="primary" 
          class="w-full sm:w-auto h-[46px] bg-[#1B3E69] hover:bg-[#153256] px-8 text-white"
          :loading="skladStore.isLoading"
          @click="onSave"
        >
          {{ buttonText }}
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
