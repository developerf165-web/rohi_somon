<script setup lang="ts">
import { reactive } from 'vue';
import { AppDrawer } from '@/shared/ui/drawer';
import { AppSelect } from '@/shared/ui/input';
import { AppTextarea } from '@/shared/ui/textarea';
import { FormActions } from '@/shared/ui/form';
import { useVacationStore } from '@/entities/Vacation';
import type { Vacation } from '@/entities/Vacation';

import { computed, watch } from 'vue';

interface Props {
  show: boolean;
  mode?: 'add' | 'view' | 'edit';
  initialData?: Vacation | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
  initialData: null
});

const emit = defineEmits(['close', 'save']);

const vacationStore = useVacationStore();

const form = reactive({
  userId: '',
  from: '',
  to: '',
  type: 'Отпуск' as 'Отпуск' | 'Отгул', // Default type
  comment: '',
});

const errors = reactive({
  userId: false,
  from: false,
  to: false,
  type: false
});

const title = computed(() => {
  if (props.mode === 'view') return 'Просмотр';
  if (props.mode === 'edit') return 'Редактировать';
  return 'Добавить';
});

const isReadOnly = computed(() => props.mode === 'view');

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.initialData && props.mode !== 'add') {
      // Populate form
      // Find user by FIO (mock) or ID if we had it. 
      // Since our mock data doesn't imply user ID link easily, we'll try to match label.
      // In real app we'd use ID.
      const user = users.find(u => u.label === props.initialData!.fio);
      form.userId = user?.value || '';
      
      // Parse dates DD.MM.YYYY -> YYYY-MM-DD for input[type=date]
      form.from = parseDate(props.initialData.from);
      form.to = parseDate(props.initialData.to);
      
      form.type = props.initialData.type as any;
      form.comment = ''; // Mock data doesn't have comment, so empty
    } else {
      // Reset form
      form.userId = '';
      form.from = '';
      form.to = '';
      form.type = 'Отпуск';
      form.comment = '';
    }
    // Clear errors
    errors.userId = false;
    errors.from = false;
    errors.to = false;
  }
});

const parseDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('.');
  return `${year}-${month}-${day}`;
};

// Mock users for the select
const users = [
  { value: '1', label: 'Ашурова Шабнам А.' },
  { value: '2', label: 'Каримов Рустам Б.' },
  { value: '3', label: 'Салимова Нигина В.' },
];

const onClose = () => {
  emit('close');
};

const onSave = () => {
  // Reset errors
  errors.userId = !form.userId;
  errors.from = !form.from;
  errors.to = !form.to;

  if (errors.userId || errors.from || errors.to) {
    return;
  }

  const selectedUser = users.find(u => u.value === form.userId);
  
  const vacationData: Vacation = {
    id: props.mode === 'edit' && props.initialData ? props.initialData.id : Date.now(),
    photo: 'https://i.pravatar.cc/150?img=' + form.userId, // Mock photo based on user ID
    fio: selectedUser?.label || 'Unknown',
    from: formatDate(form.from),
    to: formatDate(form.to),
    type: form.type,
  };

  if (props.mode === 'edit') {
    vacationStore.updateVacation(vacationData);
  } else {
    vacationStore.addVacation(vacationData);
  }

  emit('save');
  onClose();
  
  // Reset form
  form.userId = '';
  form.from = '';
  form.to = '';
  form.type = 'Отпуск';
  form.comment = '';
  
  errors.userId = false;
  errors.from = false;
  errors.to = false;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU');
};
</script>

<template>
  <AppDrawer :show="show" :title="title" @close="onClose">
    <div class="flex flex-col gap-4">
      <!-- User -->
      <AppSelect
        v-model="form.userId"
        label="Пользователь"
        placeholder="Выберите пользователя"
        :options="users"
        required
        :error="errors.userId ? 'Поле обязательно для заполнения' : ''"
        :disabled="isReadOnly"
      />

      <!-- Dates -->
      <div class="flex flex-col gap-0">
        <label class="text-[16px] font-bold leading-none text-[#1B3E69]">
          От <span class="text-red-500 ml-0.5">*</span>
        </label>
        <input
          v-model="form.from"
          type="date"
          class="h-[42px] px-4 rounded-lg border text-[#3F5575] focus:outline-none transition-colors w-full"
          :class="errors.from ? 'border-red-500 focus:border-red-500' : 'border-[#C6D6E8] focus:border-[#127EEE]'"
          placeholder="дд.мм.гггг"
          :disabled="isReadOnly"
        />
      </div>

      <div class="flex flex-col gap-0">
        <label class="text-[16px] font-bold leading-none text-[#1B3E69]">
          До <span class="text-red-500 ml-0.5">*</span>
        </label>
        <input
          v-model="form.to"
          type="date"
          class="h-[42px] px-4 rounded-lg border text-[#3F5575] focus:outline-none transition-colors w-full"
          :class="errors.to ? 'border-red-500 focus:border-red-500' : 'border-[#C6D6E8] focus:border-[#127EEE]'"
          placeholder="дд.мм.гггг"
          :disabled="isReadOnly"
        />
      </div>

      <!-- Type -->
      <div class="flex flex-col gap-0">
        <label class="text-[16px] font-bold leading-none text-[#1B3E69]">
          Тип <span class="text-red-500 ml-0.5">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="h-[42px] rounded-lg border transition-all text-[14px] font-medium"
            :class="form.type === 'Отпуск' ? 'border-[#127EEE] text-[#127EEE] bg-[#F0F7FF]' : 'border-[#C6D6E8] text-[#3F5575] hover:bg-gray-50'"
            @click="!isReadOnly && (form.type = 'Отпуск')"
            :disabled="isReadOnly"
          >
            Отпуск
          </button>
          <button
            class="h-[42px] rounded-lg border transition-all text-[14px] font-medium"
            :class="form.type === 'Отгул' ? 'border-[#127EEE] text-[#127EEE] bg-[#F0F7FF]' : 'border-[#C6D6E8] text-[#3F5575] hover:bg-gray-50'"
            @click="!isReadOnly && (form.type = 'Отгул')"
            :disabled="isReadOnly"
          >
            Отгул
          </button>
        </div>
      </div>

      <!-- Comment -->
      <AppTextarea
        v-model="form.comment"
        label="Комментария"
        placeholder="Напишите что-нибудь..."
        :disabled="isReadOnly"
      />

      <!-- Actions -->
      <FormActions
        @cancel="onClose"
        @submit="onSave"
        submit-text="Сохранить"
        cancel-text="Отмена"
        :hide-save="isReadOnly"
      />
    </div>
  </AppDrawer>
</template>
