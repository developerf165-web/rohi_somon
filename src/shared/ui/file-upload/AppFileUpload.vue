<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Image as ImageIcon, FileText, X } from 'lucide-vue-next';

interface Props {
  variant?: 'default' | 'minimal';
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

// Initialize existing files
watch(() => props.existingFiles, (newFiles) => {
  existingPreviews.value = [...newFiles];
}, { immediate: true, deep: true });

const allPreviews = computed(() => [...existingPreviews.value, ...previews.value]);
const hasFiles = computed(() => allPreviews.value.length > 0);

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;
  return props.type === 'image' ? 'Выберите фото' : 'Выберите файл';
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
      previews.value.push(''); // No preview for non-images
      emit('update:dataUrls', allPreviews.value);
    }
  });
  
  emit('update:files', files.value);
};

const removeFile = (index: number) => {
  if (props.disabled) return;
  
  // If index is within existing files range
  if (index < existingPreviews.value.length) {
    // For now, we don't strictly "delete" existing files from server, just hide them locally
    // In a real app we might emit an event 'remove-existing'
    existingPreviews.value.splice(index, 1);
  } else {
    // It's a new file
    const newFileIndex = index - existingPreviews.value.length;
    files.value.splice(newFileIndex, 1);
    previews.value.splice(newFileIndex, 1);
    emit('update:files', files.value);
  }
  emit('update:dataUrls', allPreviews.value);
};
</script>

<template>
  <!-- Minimal Variant (used in integrated containers like Kadr form) -->
  <div v-if="variant === 'minimal'" class="flex flex-col items-center justify-center py-4 px-4 transition-colors cursor-pointer group relative w-full h-full">
    <input 
      type="file" 
      class="absolute inset-0 opacity-0 cursor-pointer z-10" 
      :accept="accept || (type === 'image' ? 'image/*' : '.pdf,.doc,.docx')"
      :multiple="maxFiles > 1"
      @change="onFileChange"
      :disabled="disabled"
    />
    
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

  <!-- Default Variant (standard card style for Points, etc) -->
  <div v-else class="w-full flex flex-col" :class="label ? 'space-y-1' : ''">
    <label v-if="label" class="text-[16px] font-bold text-[#1B3E69] leading-none">
      {{ label }}
    </label>
    
    <div class="bg-white border border-[#C6D6E8] rounded-[10px] flex overflow-hidden min-h-[100px] flex-1" :class="{ 'bg-gray-50': disabled }">
      <!-- Left: Upload Trigger -->
      <label class="w-[180px] flex flex-col items-center justify-center transition-colors shrink-0 relative py-2" :class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-slate-50/50'">
        <input 
          type="file" 
          class="hidden" 
          :accept="accept || (type === 'image' ? 'image/*' : '.pdf,.doc,.docx')"
          :multiple="maxFiles > 1"
          @change="onFileChange"
          :disabled="disabled"
        />
        <div class="w-[48px] h-[48px] border border-[#8DA2C0] rounded-[10px] flex items-center justify-center mb-2">
          <ImageIcon v-if="type === 'image'" class="w-6 h-6 text-[#8DA2C0]" />
          <FileText v-else class="w-6 h-6 text-[#8DA2C0]" />
        </div>
        <span class="text-[13px] text-[#20508A] font-bold">{{ displayPlaceholder }}</span>
        
        <!-- Separator -->
        <div class="absolute right-0 top-1/2 -translate-y-1/2 h-[60%] border-r border-dashed border-[#C6D6E8]"></div>
      </label>

      <!-- Right: Previews/Placeholder -->
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
</template>

