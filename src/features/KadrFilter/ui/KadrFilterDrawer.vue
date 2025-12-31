<script setup lang="ts">
import { ref } from 'vue';
import AppDrawer from '@/shared/ui/drawer/AppDrawer.vue';
import { AppSelect } from '@/shared/ui/input';
import type { KadrFilters } from '@/entities/Kadr';

const props = defineProps<{
  show: boolean;
  initialFilters: KadrFilters;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'apply', filters: KadrFilters): void;
  (e: 'reset'): void;
}>();

const selectedPosition = ref<string | null>(props.initialFilters.positions[0] || null);
const selectedRole = ref<string | null>(props.initialFilters.roles[0] || null);
const cvStatus = ref<'all' | 'has' | 'none'>(props.initialFilters.cvStatus);
const selectedGenders = ref<string[]>([...props.initialFilters.genders]);

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

const cvOptions = [
  { value: 'all', label: 'Все' },
  { value: 'has', label: 'Есть' },
  { value: 'none', label: 'Нет' },
] as const;

const genderOptions = [
  { value: 'all', label: 'Оба' },
  { value: 'мужчина', label: 'Мужчина' },
  { value: 'женщина', label: 'Женщина' },
];

const handleGenderToggle = (value: string) => {
  if (value === 'all') {
    selectedGenders.value = [];
  } else {
    selectedGenders.value = [value];
  }
};

const apply = () => {
  emit('apply', {
    ...props.initialFilters,
    positions: selectedPosition.value ? [selectedPosition.value] : [],
    roles: selectedRole.value ? [selectedRole.value] : [],
    cvStatus: cvStatus.value,
    genders: selectedGenders.value,
  });
};
</script>

<template>
  <AppDrawer :show="show" title="Фильтр" @close="$emit('close')">
    <div class="flex flex-col gap-5">
      <!-- Должность -->
      <AppSelect 
        v-model="selectedPosition"
        :options="positions"
        label="Должность"
        placeholder="Выберите должность"
      />

      <!-- Роль -->
      <AppSelect 
        v-model="selectedRole"
        :options="roles"
        label="Роль"
        placeholder="Выберите роль"
      />

      <!-- CV Toggle -->
      <div class="flex flex-col gap-2">
        <label class="text-[#3F5575] font-semibold text-[16px]">CV</label>
        <div class="flex bg-white rounded-lg border border-[#DDE2E4] p-1 gap-1">
          <button
            v-for="opt in cvOptions"
            :key="opt.value"
            @click="cvStatus = opt.value"
            :class="[
              'flex-1 py-2.5 rounded-md text-sm font-bold transition-all',
              cvStatus === opt.value
                ? 'bg-[#1B3E69] text-white shadow-sm'
                : 'text-[#9AA6AC] hover:text-[#1B3E69]'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Пол Toggle -->
      <div class="flex flex-col gap-2">
        <label class="text-[#3F5575] font-semibold text-[16px]">Пол</label>
        <div class="flex bg-white rounded-lg border border-[#DDE2E4] p-1 gap-1">
          <button
            v-for="opt in genderOptions"
            :key="opt.value"
            @click="handleGenderToggle(opt.value)"
            :class="[
              'flex-1 py-2.5 rounded-md text-sm font-bold transition-all',
              (opt.value === 'all' && selectedGenders.length === 0) || selectedGenders.includes(opt.value)
                ? 'bg-[#1B3E69] text-white shadow-sm'
                : 'text-[#9AA6AC] hover:text-[#1B3E69]'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-4">
        <button 
          @click="$emit('close')"
          class="flex-1 h-12 rounded-lg border border-[#DDE2E4] text-[#1B3E69] font-bold text-base hover:bg-slate-50 transition-colors"
        >
          Отмена
        </button>
        <button 
          @click="apply"
          class="flex-1 h-12 rounded-lg bg-[#1B3E69] text-white font-bold text-base hover:bg-[#1B3E69]/90 transition-colors"
        >
          Применить
        </button>
      </div>
    </template>
  </AppDrawer>
</template>

<style scoped>
</style>
