<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { AppSelect } from '@/shared/ui/select';
import { FormActions } from '@/shared/ui/form';
import { useScheduleStore } from '@/entities/Schedule';
import { weekDays, scheduleTypes } from '@/entities/Schedule/model/constants';
import { useScheduleForm } from '@/features/manage-schedule/model/useScheduleForm';
import ScheduleDayRow from '@/features/manage-schedule/ui/ScheduleDayRow.vue';

const router = useRouter();
const route = useRoute();
const store = useScheduleStore();

const props = defineProps<{
  id?: string;
}>();

// Modes
const isEditMode = computed(() => route.name === 'schedules-edit');
const isViewMode = computed(() => route.name === 'schedules-view');
const isCreateMode = computed(() => !isEditMode.value && !isViewMode.value);

const { 
  schedule, 
  loadSchedule, 
  onDayActiveChange, 
  addInterval, 
  removeInterval, 
  copyToAllDays, 
  validateSchedule 
} = useScheduleForm();

const pageTitle = computed(() => {
  if (isCreateMode.value) return 'Добавить расписания';
  if (isEditMode.value) return 'Изменить расписания';
  return 'Просмотр расписания';
});

const submitButtonText = computed(() => {
  if (isCreateMode.value) return 'Сохранить';
  if (isEditMode.value) return 'Изменить';
  return 'Редактировать'; // For View mode action
});

// Mock data for users
const users = [
  { value: 1, label: 'Нуриддин Шахобов Фаррухович' },
  { value: 2, label: 'Алиев Вали' },
  { value: 101, label: 'Нуриддин Шахобов Фаррухович' }, // Match mock store data
  { value: 102, label: 'Нуриддин Шахобов Фаррухович' },
];

const selectedUser = ref<number | null>(null);
const selectedType = ref<string | null>(null);

onMounted(() => {
  if (props.id) {
    const existingSchedule = loadSchedule(Number(props.id));
    if (existingSchedule) {
      selectedUser.value = existingSchedule.employeeId;
      selectedType.value = 'fixed'; // Mock type
    }
  }
});

const onSave = () => {
  if (isViewMode.value) {
    // Navigate to edit
    router.push(`/schedules/edit/${props.id}`);
    return;
  }

  if (!validateSchedule(selectedType.value)) return;

  const payload = {
    id: props.id ? Number(props.id) : 0, 
    employeeId: selectedUser.value || 0,
    fio: users.find(u => u.value === selectedUser.value)?.label || 'Unknown',
    schedule: { ...schedule }
  };

  if (isEditMode.value) {
    store.updateSchedule(payload);
  } else {
    store.addSchedule(payload);
  }
  router.push('/schedules');
};

const onCancel = () => {
  router.push('/schedules');
};
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-8">
      <!-- Header Area -->
      <div class="flex flex-col gap-1">
        <h1 class="text-[24px] font-bold text-[#1B3E69] leading-none">Расписания</h1>
        <div class="flex items-center gap-2 text-[13px] font-medium">
          <router-link to="/schedules" class="text-[#8FA0B2] hover:text-[#127EEE] transition-colors">
            Расписания
          </router-link>
          <span class="text-[#8FA0B2]">/</span>
          <span class="text-[#3F5575]">{{ pageTitle }}</span>
        </div>
      </div>

      <!-- Form Area -->
      <div class="max-w-[800px] flex flex-col gap-8">
        
        <!-- Top Row: User and Type -->
        <div class="grid grid-cols-2 gap-8">
          <!-- User Select -->
          <div class="flex flex-col gap-2">
            <label class="text-[16px] font-bold text-[#1B3E69]">
              Пользователь <span class="text-[#E02D2D]">*</span>
            </label>
            <AppSelect
              v-model="selectedUser"
              :options="users"
              placeholder="Выберите пользователя"
              :disabled="isViewMode || isEditMode"
            />
          </div>

          <!-- Type Select -->
          <div class="flex flex-col gap-2">
            <label class="text-[16px] font-bold text-[#1B3E69]">
              Тип расписания <span class="text-[#E02D2D]">*</span>
            </label>
            <AppSelect
              v-model="selectedType"
              :options="scheduleTypes"
              placeholder="Выберите тип"
              :disabled="isViewMode"
            />
          </div>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-2 gap-x-8 gap-y-6">
          <div v-for="day in weekDays" :key="day.key">
            <ScheduleDayRow
              :day-key="day.key"
              :label="day.label"
              :day-data="schedule[day.key]"
              :is-view-mode="isViewMode"
              @update:active="(val) => onDayActiveChange(day.key, val)"
              @add-interval="addInterval(day.key)"
              @remove-interval="(idx) => removeInterval(day.key, idx)"
              @copy-to-all="copyToAllDays(day.key)"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end pt-4">
          <FormActions
            :save-text="submitButtonText"
            cancel-text="Отмена"
            @save="onSave"
            @cancel="onCancel"
          />
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>
