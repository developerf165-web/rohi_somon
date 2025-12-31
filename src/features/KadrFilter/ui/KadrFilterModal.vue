<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '@/shared/ui/modal/AppModal.vue';
import AppButton from '@/shared/ui/button/AppButton.vue';

interface FilterState {
  roles: string[];
  genders: string[];
}

const props = defineProps<{
  show: boolean;
  initialFilters: FilterState;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'apply', filters: FilterState): void;
  (e: 'reset'): void;
}>();

const selectedRoles = ref<string[]>([...props.initialFilters.roles]);
const selectedGenders = ref<string[]>([...props.initialFilters.genders]);

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

const toggleRole = (role: string) => {
  const index = selectedRoles.value.indexOf(role);
  if (index === -1) selectedRoles.value.push(role);
  else selectedRoles.value.splice(index, 1);
};

const toggleGender = (gender: string) => {
  const index = selectedGenders.value.indexOf(gender);
  if (index === -1) selectedGenders.value.push(gender);
  else selectedGenders.value.splice(index, 1);
};

const reset = () => {
  selectedRoles.value = [];
  selectedGenders.value = [];
  emit('reset');
};

const apply = () => {
  emit('apply', {
    roles: selectedRoles.value,
    genders: selectedGenders.value,
  });
};
</script>

<template>
  <AppModal :show="show" title="Фильтры" maxWidth="500px" @close="$emit('close')">
    <div class="p-6 flex flex-col gap-8">
      <!-- Role Filter -->
      <div class="flex flex-col gap-4">
        <h4 class="text-[#1B3E69] font-bold text-lg">Роль</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="role in roles"
            :key="role.value"
            @click="toggleRole(role.value)"
            :class="[
              'px-4 py-2 rounded-lg border transition-all text-sm font-medium',
              selectedRoles.includes(role.value)
                ? 'bg-[#1B3E69] border-[#1B3E69] text-white'
                : 'border-[#C6D6E8] text-[#5B7395] hover:border-[#1B3E69]'
            ]"
          >
            {{ role.label }}
          </button>
        </div>
      </div>

      <!-- Gender Filter -->
      <div class="flex flex-col gap-4">
        <h4 class="text-[#1B3E69] font-bold text-lg">Пол</h4>
        <div class="flex gap-2">
          <button
            v-for="gender in genders"
            :key="gender.value"
            @click="toggleGender(gender.value)"
            :class="[
              'px-4 py-2 rounded-lg border transition-all text-sm font-medium flex-1',
              selectedGenders.includes(gender.value)
                ? 'bg-[#1B3E69] border-[#1B3E69] text-white'
                : 'border-[#C6D6E8] text-[#5B7395] hover:border-[#1B3E69]'
            ]"
          >
            {{ gender.label }}
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <button 
          @click="reset"
          class="text-[#5B7395] hover:text-[#1B3E69] font-semibold text-sm transition-colors"
        >
          Сбросить все
        </button>
        <div class="flex gap-3">
          <AppButton variant="secondary" class="h-10 px-6" @click="$emit('close')">
            Отмена
          </AppButton>
          <AppButton variant="primary" class="h-10 px-8" @click="apply">
            Применить
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
