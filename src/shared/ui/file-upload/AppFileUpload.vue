<script setup lang="ts">
import { ref, computed } from 'vue';
import { Image as ImageIcon, X } from 'lucide-vue-next';

interface Props {
  label?: string;
  maxFiles?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 5,
});

const formattedLabel = computed(() => {
  if (!props.label) return null;
  if (props.label.endsWith('*')) {
    return {
      text: props.label.slice(0, -1).trim(),
      required: true
    };
  }
  return {
    text: props.label,
    required: false
  };
});

const files = ref<File[]>([]);
const previews = ref<string[]>([]);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const newFiles = Array.from(target.files);
  const remainingSlots = props.maxFiles - files.value.length;
  
  newFiles.slice(0, remainingSlots).forEach(file => {
    files.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => previews.value.push(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
  previews.value.splice(index, 1);
};
</script>

<template>
  <div class="w-full space-y-2">
    <label 
      v-if="formattedLabel" 
      class="text-[16px] font-bold text-[#1B3E69] leading-none"
    >
      {{ formattedLabel.text }}
      <span v-if="formattedLabel.required" class="text-red-500 ml-0.5">*</span>
    </label>
    
    <!-- Unified Container -->
    <div class="w-full min-h-[140px] bg-white border border-[#C6D6E8] rounded-[6px] flex overflow-hidden">
      <!-- Left: Upload Trigger -->
      <label 
        class="w-[200px] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 transition-colors shrink-0 relative py-6"
      >
        <input 
          type="file" 
          class="hidden" 
          accept="image/*" 
          multiple 
          @change="onFileChange"
        />
        <div class="w-[60px] h-[60px] border border-[#8DA2C0] rounded-[12px] flex items-center justify-center mb-3">
          <ImageIcon class="w-8 h-8 text-[#8DA2C0]" />
        </div>
        <span class="text-[14px] text-[#20508A] font-medium">Выберите фото</span>
        
        <!-- Dashed Vertical Separator -->
        <div class="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] border-r border-dashed border-[#C6D6E8]"></div>
      </label>

      <!-- Right: Previews/Placeholder -->
      <div class="flex-1 p-6 flex flex-wrap gap-6 items-center justify-start min-w-0">
        <div v-if="previews.length === 0" class="w-full text-[14px] text-[#8DA2C0] opacity-80 text-center">
          Здесь появятся выбранные фото
        </div>
        
        <div 
          v-for="(src, index) in previews" 
          :key="src" 
          class="relative w-[92px] h-[92px] shrink-0"
        >
          <div class="w-full h-full rounded-[6px] overflow-hidden border border-slate-200 shadow-sm">
            <img :src="src" class="w-full h-full object-cover" />
          </div>
          <button 
            class="absolute -top-2 -right-2 w-5 h-5 bg-[#FF6262] text-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-red-600 transition-colors"
            @click="removeFile(index)"
          >
            <X :size="12" stroke-width="3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
