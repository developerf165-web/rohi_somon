<script setup lang="ts">
import { AppModal } from '@/shared/ui/modal';
import { AppInput } from '@/shared/ui/input';
import { AppTable } from '@/shared/ui/table';
import { Search } from 'lucide-vue-next';

interface Header {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface Props {
  show: boolean;
  title: string;
  searchPlaceholder?: string;
  modelValue: string;
  headers: Header[];
  items: any[];
  isLoading?: boolean;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Поиск по имени',
  isLoading: false,
  maxWidth: '650px',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'close'): void;
  (e: 'select', item: any): void;
}>();

const onSearchInput = (value: string) => {
  emit('update:modelValue', value);
};

const handleSelect = (item: any) => {
  emit('select', item);
  emit('close');
};
</script>

<template>
  <AppModal
    :show="show"
    :title="title"
    :max-width="maxWidth"
    @close="emit('close')"
  >
    <div class="px-6 pb-6 pt-3 flex flex-col h-[450px] overflow-hidden">
      <!-- Fixed Search area at the top -->
      <div class="mb-4 flex-shrink-0">
        <AppInput
          :model-value="modelValue"
          :placeholder="searchPlaceholder"
          class="w-full search-input"
          @update:model-value="onSearchInput"
        >
          <template #prefix>
             <Search :size="18" class="text-[#8DA2C0]" />
          </template>
        </AppInput>
      </div>

      <!-- Scrollable Table Section -->
      <div class="flex-1 overflow-hidden border border-[#C6D6E8] rounded-[10px] flex flex-col min-h-0 bg-white">
        <div class="overflow-y-auto flex-1 custom-scrollbar relative">
          <AppTable
            :headers="headers"
            :items="items"
            :loading="isLoading"
            :selectable="false"
            class="selection-modal-table"
          >
            <tr 
              v-for="(item, index) in items"
              :key="item.id || index"
              class="group hover:bg-[#F2F7FB] transition-colors cursor-pointer border-b border-[#C6D6E8] last:border-0 bg-white"
              @click="handleSelect(item)"
            >
              <td 
                v-for="header in headers" 
                :key="header.key" 
                class="p-3 text-[#1B3E69] font-medium border-r border-[#C6D6E8] last:border-r-0 text-[14px]"
                :class="[
                  header.align === 'center' ? 'text-center' : 'text-left'
                ]"
                :style="header.width ? { width: header.width, minWidth: header.width } : {}"
              >
                <slot :name="`item-${header.key}`" :item="item" :index="index">
                   <span v-if="header.key === 'index'">{{ index + 1 }}</span>
                   <span v-else>{{ item[header.key] }}</span>
                </slot>
              </td>
            </tr>
          </AppTable>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
/* Стилизация инпутов */
:deep(.search-input input) {
  height: 44px;
  border-radius: 8px;
  background-color: white !important;
  border-color: #E5ECF4;
  font-size: 14px;
  color: #1B3E69;
}

:deep(.search-input input:focus) {
  border-color: #1B3E69;
}

/* Стилизация AppTable для модалки */
:deep(.selection-modal-table) {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
}

:deep(.selection-modal-table table) {
  border-collapse: collapse !important;
  width: 100% !important;
  table-layout: fixed !important;
}

:deep(.selection-modal-table thead tr) {
  background-color: #E5ECF4 !important;
}

:deep(.selection-modal-table th) {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #E5ECF4 !important;
  color: #3F5575;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 12px; /* Совпадаем с td p-3 (12px) */
  border-bottom: 1px solid #C6D6E8 !important;
  border-right: 1px solid #C6D6E8 !important;
  height: 40px;
  box-sizing: border-box;
}

:deep(.selection-modal-table th:last-child) {
  border-right: none !important;
}

:deep(.selection-modal-table td) {
  height: 44px;
  padding: 12px !important; /* Соответствует p-3 */
  box-sizing: border-box;
}

/* Custom Scrollbar Styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #C6D6E8;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #8DA2C0;
}
</style>
