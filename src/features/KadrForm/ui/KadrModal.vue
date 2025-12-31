<script setup lang="ts">
import { ref, watch } from 'vue';
import AppModal from '@/shared/ui/modal/AppModal.vue';
import AppInput from '@/shared/ui/input/AppInput.vue';
import AppButton from '@/shared/ui/button/AppButton.vue';
import { useKadrStore, type Kadr } from '@/entities/Kadr';

const props = defineProps<{
  show: boolean;
  employeeId?: number | string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const kadrStore = useKadrStore();

const form = ref<Omit<Kadr, 'id'>>({
  name: '',
  photo: '',
  position: '',
  birthDate: '',
  cv: 'view',
  role: 'worker',
  gender: 'мужчина',
});

watch(() => props.show, (newShow) => {
  if (newShow) {
    if (props.employeeId) {
      const emp = kadrStore.employees.find(e => e.id === props.employeeId);
      if (emp) {
        form.value = { ...emp };
      }
    } else {
      form.value = {
        name: '',
        position: '',
        birthDate: '',
        role: 'worker',
        gender: 'мужчина',
        photo: '',
        cv: 'view',
      };
    }
  }
});

const save = async () => {
  // In a real app, this would hit an API
  if (props.employeeId) {
    const index = kadrStore.employees.findIndex(e => e.id === props.employeeId);
    if (index !== -1) {
      kadrStore.employees[index] = { ...kadrStore.employees[index], ...form.value } as Kadr;
    }
  } else {
    const newId = Math.max(0, ...kadrStore.employees.map(e => Number(e.id))) + 1;
    kadrStore.employees.push({
      ...form.value,
      id: newId,
    } as Kadr);
  }
  emit('saved');
  emit('close');
};
</script>

<template>
  <AppModal 
    :show="show" 
    :title="employeeId ? 'Редактировать сотрудника' : 'Добавить сотрудника'" 
    maxWidth="600px" 
    @close="$emit('close')"
  >
    <div class="p-8 flex flex-col gap-6">
      <AppInput 
        v-model="form.name" 
        label="ФИО" 
        placeholder="Введите полно имя" 
      />
      
      <div class="grid grid-cols-2 gap-6">
        <AppInput 
          v-model="form.position" 
          label="Должность" 
          placeholder="Напр. Менеджер" 
        />
        <AppInput 
          v-model="form.birthDate" 
          label="Дата рождения" 
          placeholder="ДД.ММ.ГГГГ" 
        />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-[#1B3E69]">Роль</label>
          <select 
            v-model="form.role" 
            class="h-11 px-4 bg-white border border-[#DDE2E4] rounded-lg outline-none focus:border-[#1B3E69] transition-colors"
          >
            <option value="admin">Администратор</option>
            <option value="worker">Работник</option>
            <option value="saler">Продавец</option>
            <option value="manager">Менеджер</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-[#1B3E69]">Пол</label>
          <select 
            v-model="form.gender" 
            class="h-11 px-4 bg-white border border-[#DDE2E4] rounded-lg outline-none focus:border-[#1B3E69] transition-colors"
          >
            <option value="мужчина">Мужчина</option>
            <option value="женщина">Женщина</option>
          </select>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <AppButton variant="secondary" @click="$emit('close')">
          Отмена
        </AppButton>
        <AppButton variant="primary" class="px-8" @click="save">
          Сохранить
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
