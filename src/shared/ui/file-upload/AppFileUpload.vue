<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Image as ImageIcon, FileText, X } from 'lucide-vue-next';

interface Props {
  variant?: 'default' | 'minimal' | 'input';
  type?: 'image' | 'file';
  label?: string;
  placeholder?: string;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
  existingFiles?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'image',
  maxFiles: 1,
  disabled: false,
  existingFiles: () => [],
});

const emit = defineEmits<{
  (e: 'update:files', files: File[]): void;
  (e: 'update:dataUrls', urls: string[]): void;
}>();

const files = ref<File[]>([]);
const previews = ref<string[]>([]);
const existingPreviews = ref<string[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

// Initialize existing files
watch(() => props.existingFiles, (newFiles) => {
  existingPreviews.value = [...newFiles];
}, { immediate: true, deep: true });

const allPreviews = computed(() => [...existingPreviews.value, ...previews.value]);
const hasFiles = computed(() => allPreviews.value.length > 0);

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;
  if (props.variant === 'input') return 'Выберите фото';
  return props.type === 'image' ? 'Выберите фото' : 'Выберите файл';
});

const selectedFileName = computed(() => {
  if (!hasFiles.value) return '';
  // If we have existing files, show the last one's name or a generic label
  if (existingPreviews.value.length > 0) {
    const last = existingPreviews.value[existingPreviews.value.length - 1];
    if (last) return last.split('/').pop() || 'Файл выбран';
  }
  // If we have newly selected files
  if (files.value.length > 0) {
    const lastFile = files.value[files.value.length - 1];
    if (lastFile) return lastFile.name;
  }
  return 'Файл выбран';
});

const onFileChange = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const newFiles = Array.from(target.files);
  const totalCurrentFiles = files.value.length + existingPreviews.value.length;
  const remainingSlots = props.maxFiles - totalCurrentFiles;
  
  if (remainingSlots <= 0) return;

  newFiles.slice(0, remainingSlots).forEach(file => {
    files.value.push(file);
    if (props.type === 'image' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        previews.value.push(result);
        emit('update:dataUrls', allPreviews.value);
      };
      reader.readAsDataURL(file);
    } else {
      previews.value.push(''); 
      emit('update:dataUrls', allPreviews.value);
    }
  });
  
  emit('update:files', files.value);
};

const removeFile = (index: number) => {
  if (props.disabled) return;
  
  if (index < existingPreviews.value.length) {
    existingPreviews.value.splice(index, 1);
  } else {
    const newFileIndex = index - existingPreviews.value.length;
    files.value.splice(newFileIndex, 1);
    previews.value.splice(newFileIndex, 1);
    emit('update:files', files.value);
  }
  emit('update:dataUrls', allPreviews.value);
};

const triggerPicker = () => {
  if (!props.disabled && fileInput.value) {
    fileInput.value.click();
  }
};
</script>

<template>
  <div class="flex flex-col w-full h-full" :class="label ? 'space-y-1' : ''">
    <!-- Shared Label Logic -->
    <label v-if="label" class="text-[16px] font-bold text-[#1B3E69] leading-none mb-1">
      {{ label }}
    </label>

    <div class="relative w-full flex-1 flex flex-col min-h-0">
      <input 
        type="file" 
        ref="fileInput"
        class="hidden" 
        :accept="accept || (type === 'image' ? 'image/*' : '.pdf,.doc,.docx')"
        :multiple="maxFiles > 1"
        @change="onFileChange"
        :disabled="disabled"
      />

      <!-- 1. Minimal Variant (Kadr Form style) -->
      <div 
        v-if="variant === 'minimal'" 
        @click="triggerPicker"
        class="flex flex-col items-center justify-center py-4 px-4 transition-colors cursor-pointer group w-full h-full min-h-[100px]"
      >
        <div v-if="!hasFiles" class="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-200" :class="{ 'opacity-50': disabled }">
          <div class="text-[#8DA2C0] group-hover:text-[#1B3E69] transition-colors">
            <ImageIcon v-if="type === 'image'" :size="32" stroke-width="1.5" />
            <FileText v-else :size="32" stroke-width="1.5" />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[#1B3E69] font-bold text-[14px]">
              {{ displayPlaceholder }}
            </span>
            <span class="text-[#8DA2C0] text-[12px] font-medium leading-tight">
              {{ disabled ? (type === 'image' ? 'Нет фото' : 'Нет файла') : 'Файл не выбран' }}
            </span>
          </div>
        </div>

        <div v-else class="flex flex-wrap gap-4 justify-center">
          <div v-for="(preview, idx) in allPreviews" :key="idx" class="relative group/item">
            <div v-if="type === 'image' && preview" class="w-16 h-16 rounded-lg overflow-hidden border border-[#DDE2E4]">
              <img :src="preview" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-20 h-20 rounded-lg bg-[#F4F7FA] border border-[#DDE2E4] flex flex-col items-center justify-center p-2 text-center">
              <FileText class="text-[#1B3E69] mb-1" :size="24" stroke-width="1.5" />
              <span class="text-[10px] text-[#3F5575] font-medium truncate w-full px-1">Файл</span>
            </div>
            
            <button 
              v-if="!disabled"
              @click.stop="removeFile(idx)"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors z-20"
            >
              <X :size="12" />
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Input Variant (Suppliers/Nomenclature style) -->
      <div 
        v-else-if="variant === 'input'"
        @click="triggerPicker"
        class="flex h-[46px] w-full rounded-[10px] border border-[#C6D6E8] bg-white px-4 py-2 text-[14px] items-center cursor-pointer transition-all hover:border-[#8DA2C0]"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      >
        <span v-if="hasFiles" class="text-[#1B3E69] truncate">{{ selectedFileName }}</span>
        <span v-else class="text-[#8DA2C0]">{{ displayPlaceholder }}</span>
      </div>

      <!-- 3. Default Variant (Card style for Points) -->
      <div 
        v-else 
        class="bg-white border border-[#C6D6E8] rounded-[10px] flex overflow-hidden min-h-[100px] flex-1 h-full" 
        :class="{ 'bg-gray-50': disabled }"
      >
        <label 
          @click="triggerPicker"
          class="w-[180px] flex flex-col items-center justify-center transition-colors shrink-0 relative py-2" 
          :class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-slate-50/50'"
        >
          <div class="w-[48px] h-[48px] border border-[#8DA2C0] rounded-[10px] flex items-center justify-center mb-2">
            <ImageIcon v-if="type === 'image'" class="w-6 h-6 text-[#8DA2C0]" />
            <FileText v-else class="w-6 h-6 text-[#8DA2C0]" />
          </div>
          <span class="text-[13px] text-[#20508A] font-bold">{{ displayPlaceholder }}</span>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 h-[60%] border-r border-dashed border-[#C6D6E8]"></div>
        </label>

        <div class="flex-1 p-4 flex flex-wrap gap-4 items-center justify-start min-w-0 overflow-y-auto">
          <div v-if="!hasFiles" class="w-full flex flex-col items-center gap-1 opacity-80">
            <span class="text-[14px] text-[#1B3E69] font-bold">
              {{ type === 'image' ? 'Фото не выбраны' : 'Файлы не выбраны' }}
            </span>
            <span class="text-[12px] text-[#8DA2C0] font-medium">
              {{ disabled ? (type === 'image' ? 'Нет фото' : 'Нет файла') : (type === 'image' ? 'PNG, JPG, SVG' : 'Выберите файл для загрузки') }}
            </span>
          </div>
          
          <div v-for="(preview, idx) in allPreviews" :key="idx" class="relative group/item">
            <div v-if="type === 'image' && preview" class="w-[92px] h-[92px] rounded-[6px] overflow-hidden border border-[#DDE2E4]">
              <img :src="preview" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-[92px] h-[92px] rounded-[6px] bg-[#F4F7FA] border border-[#DDE2E4] flex flex-col items-center justify-center p-2 text-center">
              <FileText class="text-[#1B3E69] mb-1" :size="32" stroke-width="1.5" />
              <span class="text-[10px] text-[#3F5575] font-medium truncate w-full px-1">Файл</span>
            </div>
            
            <button 
              v-if="!disabled"
              @click.stop="removeFile(idx)"
              class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors z-20"
            >
              <X :size="12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
