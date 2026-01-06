<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AppInput } from '@/shared/ui/input';
import { AppSelect } from '@/shared/ui/select';
import { FormActions } from '@/shared/ui/form';
import { useSkladStore } from '@/entities/Sklad';
import { usePointStore } from '@/entities/Point';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const router = useRouter();
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

const isReadOnly = computed(() => props.mode === 'view');
const pageTitle = computed(() => {
  switch (props.mode) {
    case 'edit': return 'Редактировать'; // Using "Редактировать" as it's standard
    case 'view': return 'Просмотр';
    default: return 'Создать склад';
  }
});

const loadData = async () => {
    if (pointStore.points.length === 0) {
        await pointStore.fetchPoints();
    }

    if (!props.id) return;
  
    let item = skladStore.items.find(i => i.id == props.id);
  
    if (!item) {
        await skladStore.fetchSklads();
        item = skladStore.items.find(i => i.id == props.id);
    }

    if (item) {
        form.value = {
            name: item.name,
            pointId: item.pointId,
            type: item.type,
        };
    }
};

onMounted(() => {
  if (pointStore.points.length === 0) {
      pointStore.fetchPoints();
  }
  if (props.mode !== 'add') {
    loadData();
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
  if (isReadOnly.value) return;
  if (!validate()) return;
  
  if (form.value.type) {
      let success = false;

      if (props.mode === 'add') {
         success = await skladStore.createSklad({
            name: form.value.name,
            pointId: form.value.pointId,
            type: form.value.type as 'Магазин' | 'GSM',
         });
      } else if (props.mode === 'edit' && props.id) {
         success = await skladStore.updateSklad(props.id, {
            name: form.value.name,
            pointId: form.value.pointId,
            type: form.value.type as 'Магазин' | 'GSM',
         });
      }
      
      if (success) {
        router.push('/sklad');
      }
  }
};

const onCancel = () => {
  router.push('/sklad');
};
</script>

<template>
  <EntityFormLayout 
    :title="pageTitle" 
    parent-title="Склад" 
    parent-route="/sklad" 
    :loading="skladStore.isLoading"
  >
      <!-- Main Inputs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppInput
          v-model="form.name"
          label="Имя склада *"
          placeholder="Введите имя"
          :error="errors.name"
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
        
        <AppSelect
            v-model="form.pointId"
            label="Точка *"
            placeholder="Выберите точку"
            :options="pointOptions"
            :error="errors.pointId"
            :disabled="isReadOnly"
        />
      </div>

      <!-- Actions -->
      <FormActions 
        :is-loading="skladStore.isLoading" 
        @save="onSave" 
        @cancel="onCancel" 
        :hide-save="isReadOnly"
      />
  </EntityFormLayout>
</template>
