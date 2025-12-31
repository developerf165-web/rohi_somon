<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { AppSelect } from '@/shared/ui/select';
import { AppCheckbox } from '@/shared/ui/checkbox';
import { FormActions } from '@/shared/ui/form';

const router = useRouter();

// Mock data for users - in real app would come from store
const users = [
  { value: 1, label: 'Нуриддин Шахобов Фаррухович' },
  { value: 2, label: 'Алиев Вали' },
];

const scheduleTypes = [
  { value: 'shift', label: 'Сменный' },
  { value: 'fixed', label: 'Постоянный' },
];

const weekDays = [
  { key: 'mon', label: 'Понедельник' },
  { key: 'tue', label: 'Вторник' },
  { key: 'wed', label: 'Среда' },
  { key: 'thu', label: 'Четверг' },
  { key: 'fri', label: 'Пятница' },
  { key: 'sat', label: 'Суббота' },
  { key: 'sun', label: 'Воскресенье' },
] as const;

const selectedUser = ref<number | null>(null);
const selectedType = ref<string | null>(null);


const schedule = reactive({
  mon: { active: false, start: '08:00', end: '17:00' },
  tue: { active: false, start: '08:00', end: '17:00' },
  wed: { active: false, start: '08:00', end: '17:00' },
  thu: { active: false, start: '08:00', end: '17:00' },
  fri: { active: false, start: '08:00', end: '17:00' },
  sat: { active: false, start: '08:00', end: '17:00' },
  sun: { active: false, start: '08:00', end: '17:00' },
});

const onSave = () => {
  console.log('Saving schedule:', {
    userId: selectedUser.value,
    type: selectedType.value,
    schedule: { ...schedule }
  });
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
          <span class="text-[#3F5575]">Добавить расписания</span>
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
            />
          </div>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-2 gap-x-8 gap-y-6">
          <div v-for="day in weekDays" :key="day.key" class="flex flex-col gap-3">
            <!-- Checkbox -->
            <div class="h-6 flex items-center">
              <AppCheckbox
                v-model="schedule[day.key].active"
                :label="day.label"
                class="font-bold text-[#1B3E69]"
              />
            </div>

            <!-- Time Inputs (Conditional) -->
            <div v-if="schedule[day.key].active" class="flex items-center gap-4 pl-0">
              <div class="flex-1 flex flex-col gap-1">
                <span class="text-[13px] text-[#5B7395]">От:</span>
                <input 
                  v-model="schedule[day.key].start"
                  type="time"
                  class="w-full h-10 px-3 bg-white border border-[#C6D6E8] rounded-lg text-[14px] text-[#3F5575] focus:outline-none focus:border-[#127EEE]"
                />
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <span class="text-[13px] text-[#5B7395]">До:</span>
                <input 
                  v-model="schedule[day.key].end"
                  type="time"
                  class="w-full h-10 px-3 bg-white border border-[#C6D6E8] rounded-lg text-[14px] text-[#3F5575] focus:outline-none focus:border-[#127EEE]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end pt-4">
          <FormActions
            save-text="Сохранить"
            cancel-text="Отмена"
            @save="onSave"
            @cancel="onCancel"
          />
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>
