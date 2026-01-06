<script setup lang="ts">


interface Props {
  headers: {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }[];
  items: any[];
  isLoading?: boolean;
  selectable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  selectable: true,
});

const emit = defineEmits<{
  (e: 'select-all', value: boolean): void;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-[#C6D6E8]">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-white border-b border-[#E2E8F0]">
          <th v-if="selectable" class="py-4 px-6 w-10 text-center">
            <input 
              type="checkbox" 
              class="w-[18px] h-[18px] rounded-[4px] border border-[#C6D6E8] appearance-none cursor-pointer bg-white checked:bg-[#1B3E69] transition-colors"
              @change="(e) => emit('select-all', (e.target as HTMLInputElement).checked)"
            />
          </th>
          <th 
            v-for="header in headers" 
            :key="header.key"
            class="py-4 px-4 text-[#3F5575] font-['Manrope'] font-semibold text-[14px] leading-none tracking-normal"
            :class="[
              header.width && !header.width.includes('px') ? header.width : '',
              header.align === 'center' ? 'text-center' : header.align === 'right' ? 'text-right' : 'text-left'
            ]"
            :style="header.width && header.width.includes('px') ? { width: header.width, minWidth: header.width } : {}"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      
      <!-- Body Slot -->
      <tbody v-if="items.length > 0 && !isLoading" class="divide-y divide-[#E2E8F0]/70">
        <slot>
          <tr 
            v-for="(item, index) in items" 
            :key="item.id" 
            class="group hover:bg-slate-50 transition-colors border-b border-[#F1F5F9] last:border-0"
          >
            <td v-if="selectable" class="py-4 px-6 text-center w-[60px]">
              <input 
                type="checkbox" 
                class="w-[18px] h-[18px] rounded-[4px] border border-[#C6D6E8] appearance-none cursor-pointer bg-white checked:bg-[#1B3E69] transition-colors"
                :checked="item.selected"
                @change="(e) => item.selected = (e.target as HTMLInputElement).checked"
              />
            </td>
            
            <td 
              v-for="header in headers" 
              :key="header.key"
              class="py-4 px-4 font-['Manrope'] font-semibold text-[14px] leading-none text-[#3F5575]"
              :class="[
                header.align === 'center' ? 'text-center' : header.align === 'right' ? 'text-right' : 'text-left'
              ]"
              :style="header.width && header.width.includes('px') ? { width: header.width } : {}"
            >
              <slot :name="`item-${header.key}`" :item="item" :index="index">
                {{ item[header.key] }}
              </slot>
            </td>
          </tr>
        </slot>
      </tbody>

      <!-- Loading State -->
      <tbody v-else-if="isLoading">
        <tr>
          <td :colspan="headers.length + (selectable ? 1 : 0)" class="py-20 text-center text-[#5B7395]">
            Загрузка...
          </td>
        </tr>
      </tbody>

      <!-- Empty State -->
      <tbody v-else>
        <tr>
          <td :colspan="headers.length + (selectable ? 1 : 0)" class="py-20 text-center">
            <div class="flex flex-col items-center gap-2 text-[#5B7395]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p class="text-lg font-medium">Ничего не найдено</p>
              <p class="text-sm">Попробуйте изменить запрос</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
