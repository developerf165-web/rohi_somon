<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import { AppInput, AppSelect } from '@/shared/ui/input';
import { AppTextarea } from '@/shared/ui/textarea';
import { AppFileUpload } from '@/shared/ui/file-upload';
import { FormActions } from '@/shared/ui/form';
import { useKadrStore } from '@/entities/Kadr';

const route = useRoute();
const router = useRouter();
const kadrStore = useKadrStore();

const isEdit = computed(() => route.name === 'kadr-edit');
const employeeId = computed(() => route.params.id as string);

const form = ref({
  name: '',
  position: '',
  birthDate: '',
  role: '' as any,
  gender: '',
  startDate: '',
  comment: '',
});

const positions = [
  'Работник офиса',
  'Менеджер',
  'Директор филиала',
  'Разнорабочий',
  'Кассир',
  'HR - менеджер',
];

const roles = [
  { value: 'admin', label: 'Администратор' },
  { value: 'worker', label: 'Работник' },
  { value: 'saler', label: 'Продавец' },
  { value: 'manager', label: 'Менеджер' },
];

const genders = [
  { value: 'мужчина', label: 'Мужчина' },
  { value: 'женщина', label: 'Женщина' },
];

onMounted(() => {
  if (isEdit.value && employeeId.value) {
    const emp = kadrStore.employees.find(e => String(e.id) === employeeId.value);
    if (emp) {
      form.value = {
        name: emp.name,
        position: emp.position,
        birthDate: emp.birthDate,
        role: emp.role,
        gender: emp.gender,
        startDate: '', // Mock data doesn't have this yet
        comment: '',
      };
    }
  }
});

const onSave = () => {
  // Logic to save or update
  console.log('Saving...', form.value);
  router.push('/kadr');
};

const onCancel = () => {
  router.back();
};
</script>

<template>
  <DashboardLayout>
    <div class="max-w-[1200px] mx-auto font-manrope">
      <!-- Breadcrumbs -->
      <div class="mb-6">
        <h1 class="text-[32px] font-bold text-[#1B3E69] mb-1">
          {{ isEdit ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}
        </h1>
        <div class="flex items-center gap-2 text-sm font-medium">
          <router-link to="/kadr" class="text-[#8DA2C0] hover:text-[#1B3E69]">Сотрудники</router-link>
          <span class="text-[#8DA2C0]">/</span>
          <span class="text-[#1B3E69]">{{ isEdit ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}</span>
        </div>
      </div>

      <div class="space-y-8">
        <!-- Main Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <AppInput 
            v-model="form.name" 
            label="ФИО *" 
            placeholder="ФИО сотрудника"
          />
          
          <AppSelect 
            v-model="form.position"
            :options="positions"
            label="Должность *"
            placeholder="Выберите должность"
          />

          <AppInput 
            v-model="form.birthDate" 
            label="Дата рождения *" 
            placeholder="дд.мм.гггг"
          />

          <AppSelect 
            v-model="form.role"
            :options="roles"
            label="Роль *"
            placeholder="Выберите роль"
          />

          <AppSelect 
            v-model="form.gender"
            :options="genders"
            label="Пол *"
            placeholder="Выберите пол"
          />

          <AppInput 
            v-model="form.startDate" 
            label="Дата начала работы *" 
            placeholder="дд.мм.гггг"
          />
        </div>

        <!-- Files and Comments -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Files Column -->
          <div class="lg:col-span-1 flex flex-col gap-1">
            <label class="text-[16px] font-bold text-[#1B3E69]">Файлы</label>
            <div class="flex items-stretch bg-white border border-[#DDE2E4] rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] overflow-hidden h-[100px]">
              <div class="flex-1 relative">
                <AppFileUpload 
                   variant="minimal"
                  type="image" 
                  placeholder="Выберите аватар" 
                />
                <!-- Vertical Dotted Separator -->
                <div class="absolute right-0 top-[20%] bottom-[20%] border-r border-dashed border-[#DDE2E4]"></div>
              </div>
              <div class="flex-1">
                <AppFileUpload 
                  variant="minimal"
                  type="file" 
                  placeholder="CV - сотрудника" 
                />
              </div>
            </div>
          </div>

          <!-- Comments Column -->
          <div class="lg:col-span-1 flex flex-col gap-1">
            <label class="text-[16px] font-bold text-[#1B3E69]">Комментария</label>
            <AppTextarea 
              v-model="form.comment" 
              placeholder="Напишите что-нибудь..."
              class="h-[100px]"
            />
          </div>
        </div>

        <!-- Actions -->
        <FormActions @save="onSave" @cancel="onCancel" />
      </div>
    </div>
  </DashboardLayout>
</template>
