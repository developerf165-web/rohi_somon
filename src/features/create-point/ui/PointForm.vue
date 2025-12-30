<script setup lang="ts">
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
import AppTextarea from '@/shared/ui/textarea/AppTextarea.vue';
import AppFileUpload from '@/shared/ui/file-upload/AppFileUpload.vue';
import { MapPin } from 'lucide-vue-next';
import { usePointForm } from '../model/usePointForm';
import MapPickerModal from './MapPickerModal.vue';
import { ref } from 'vue';

const { form, isLoading, errors, onSave, onCancel } = usePointForm();
const isMapModalOpen = ref(false);

const handleCoordsSelect = (coords: { lat: number; lng: number }) => {
  form.lat = coords.lat.toString();
  form.lng = coords.lng.toString();
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-[28px] font-bold text-[#1B3E69]">Добавить</h1>
      <nav class="flex text-[13px] text-[#8DA2C0] gap-1">
        <span class="cursor-pointer hover:text-[#1B3E69] transition-colors" @click="onCancel">Точки</span>
        <span>/</span>
        <span class="text-[#1B3E69] font-medium">Добавит точку</span>
      </nav>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-[10px] p-1 space-y-8">
      <!-- Main Inputs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AppInput
          v-model="form.title"
          label="Имя точки *"
          placeholder="Введите имя"
          :error="errors.title"
          class="col-span-1"
        />

        <AppInput
          v-model="form.lng"
          label="Долгота *"
          placeholder="Введите долготу"
          :error="errors.lng"
        >
          <template #append>
            <button @click="isMapModalOpen = true" class="hover:text-primary-500 transition-colors">
              <MapPin :size="16" />
            </button>
          </template>
        </AppInput>

        <AppInput
          v-model="form.lat"
          label="Широта *"
          placeholder="Введите широту"
          :error="errors.lat"
        >
          <template #append>
            <button @click="isMapModalOpen = true" class="hover:text-primary-500 transition-colors">
              <MapPin :size="16" />
            </button>
          </template>
        </AppInput>
      </div>

      <!-- Files and Comments Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-8">
          <AppFileUpload label="Файлы" />
        </div>
        <div class="lg:col-span-4">
          <AppTextarea
            v-model="form.comment"
            label="Комментария"
            placeholder="Напишите что-нибудь..."
            :rows="6"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4">
        <AppButton 
          variant="secondary" 
          class="w-[190px] h-[46px] border-[#C6D6E8] text-[#1B3E69] bg-white hover:bg-slate-50 px-[56px] py-[12px]"
          @click="onCancel"
        >
          Отмена
        </AppButton>
        <AppButton 
          variant="primary" 
          :loading="isLoading"
          class="w-[190px] h-[46px] bg-[#1B3E69] border-[#1B3E69] px-[56px] py-[12px]"
          @click="onSave"
        >
          Сохранить
        </AppButton>
      </div>
    </div>

    <MapPickerModal
      :show="isMapModalOpen"
      :initial-lat="form.lat"
      :initial-lng="form.lng"
      @close="isMapModalOpen = false"
      @select="handleCoordsSelect"
    />
  </div>
</template>

<style scoped>
/* No more deep padding overrides needed thanks to slot support in AppInput */
</style>
