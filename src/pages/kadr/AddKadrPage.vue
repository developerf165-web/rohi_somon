<script setup lang="ts">
import { computed } from 'vue';
import { AppInput, AppSelect } from '@/shared/ui/input';
import { AppTextarea } from '@/shared/ui/textarea';
import { AppFileUpload } from '@/shared/ui/file-upload';
import { FormActions } from '@/shared/ui/form';
import { useKadrStore } from '@/entities/Kadr';
import EntityFormLayout from '@/shared/ui/layouts/EntityFormLayout.vue';
import { useEntityForm } from '@/shared/composables/useEntityForm';

interface Props {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
});

const store = useKadrStore();

const { 
  form, 
  handleSave, 
  goBack 
} = useEntityForm({
  store,
  id: props.id,
  mode: props.mode,
  backRoute: '/kadr',
  initialState: {
    photo: '', // Avatar
    cvUrl: '', // CV File
    name: '',
    position: '',
    birthDate: '',
    role: '',
    gender: '',
    phone: '',
    startDate: '', 
    login: '',
    password: '',
    comment: '',
  }
});

const isEdit = computed(() => props.mode === 'edit');
const isView = computed(() => props.mode === 'view');

const pageTitle = computed(() => {
  if (isEdit.value) return 'Изменить сотрудника';
  if (isView.value) return 'Просмотр сотрудника';
  return 'Добавить сотрудника';
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

const validate = () => {
    // Basic validation implementation
    if (!form.value.name) return false;
    if (!form.value.position) return false;
    if (!form.value.phone) return false;
    if (!form.value.login) return false;
    if (!form.value.password) return false;
    return true;
};

const onSave = async () => {
  await handleSave(validate);
};
</script>

<template>
  <EntityFormLayout 
    :title="pageTitle" 
    parent-title="Сотрудники" 
    parent-route="/kadr"
    :loading="store.isLoading"
  >
      <div class="space-y-8">
        <!-- Main Form Grid (3 columns matching Figma) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <!-- Row 1 -->
          <AppInput 
            v-model="form.name" 
            label="ФИО *" 
            placeholder="Шахобов Нуриддин Фаррухович"
            :disabled="isView"
          />
          
          <AppSelect 
            v-model="form.position"
            :options="positions"
            label="Должность *"
            placeholder="Выберите должность"
            :disabled="isView"
          />

          <AppInput 
            v-model="form.birthDate" 
            label="Дата рождения *" 
            placeholder="дд.мм.гггг"
            :disabled="isView"
          />

          <!-- Row 2 -->
          <AppSelect 
            v-model="form.role"
            :options="roles"
            label="Роль *"
            placeholder="Выберите роль"
            :disabled="isView"
          />

          <AppSelect 
            v-model="form.gender"
            :options="genders"
            label="Пол *"
            placeholder="Выберите роль"
            :disabled="isView"
          />

          <AppInput 
            v-model="form.startDate" 
            label="Дата начала работы *" 
            placeholder="дд.мм.гггг"
            :disabled="isView"
          />

          <!-- Row 3 -->
          <AppInput 
            v-model="form.phone" 
            label="Номер телефона" 
            placeholder="Введите номер телефона"
            :disabled="isView"
          />

          <AppInput 
            v-model="form.login" 
            label="Логин *" 
            placeholder="Введите логин"
            :disabled="isView"
          />

          <AppInput 
            v-model="form.password" 
            label="Пароль *" 
            type="password"
            placeholder="Введите пароль"
            :disabled="isView"
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
                  :disabled="isView"
                  :existing-files="form.photo ? [form.photo] : []"
                  @update:data-urls="(urls) => form.photo = urls[0] || ''"
                />
                <!-- Vertical Dotted Separator -->
                <div class="absolute right-0 top-[20%] bottom-[20%] border-r border-dashed border-[#DDE2E4]"></div>
              </div>
              <div class="flex-1">
                <AppFileUpload 
                  variant="minimal"
                  type="file" 
                  placeholder="CV - сотрудника" 
                  :disabled="isView"
                  :existing-files="form.cvUrl ? [form.cvUrl] : []"
                  @update:data-urls="(urls) => form.cvUrl = urls[0] || ''"
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
              :disabled="isView"
            />
          </div>
        </div>

        <!-- Actions -->
        <FormActions 
            :is-loading="store.isLoading"
            @save="onSave" 
            @cancel="goBack" 
            :hide-save="isView"
        />
      </div>
  </EntityFormLayout>
</template>
