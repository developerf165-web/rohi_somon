<script setup lang="ts">
import { ref } from 'vue';
import { AppInput } from '@/shared/ui/input';
import { AppButton } from '@/shared/ui/button';
import SelectProductModal from './SelectProductModal.vue';
import { Trash2, Package2 } from 'lucide-vue-next';
import type { ArrivalItem } from '@/entities/Arrival';

interface Props {
  items: ArrivalItem[];
  isReadOnly?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:total'): void;
}>();

const isSelectProductModalOpen = ref(false);

const onProductSelect = (product: any) => {
  const newItem: ArrivalItem = {
    id: Math.random().toString(36).substr(2, 9),
    productId: product.id,
    productName: product.name,
    unit: product.unit,
    quantity: 1,
    price: product.price || 0,
    totalPrice: product.price || 0
  };
  props.items.push(newItem);
  emit('update:total');
};

const removeProduct = (index: number) => {
  props.items.splice(index, 1);
  emit('update:total');
};

const updateItemTotal = (item: ArrivalItem) => {
  item.totalPrice = (item.quantity || 0) * (item.price || 0);
  emit('update:total');
};
</script>

<template>
  <div class="space-y-6">
    <!-- Add Product Button -->
    <div v-if="!isReadOnly">
      <AppButton 
        variant="primary"
        class="px-8 h-12 rounded-[10px] text-[16px] font-bold"
        @click="isSelectProductModalOpen = true"
      >
        Добавить продукт
      </AppButton>
    </div>

    <!-- Dynamic Products Table or Empty State -->
    <div 
      v-if="items.length > 0"
      class="border border-[#C6D6E8] rounded-[10px] overflow-hidden bg-[#E5ECF4] shadow-sm"
    >
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-[#E5ECF4] border-b border-[#C6D6E8]">
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center w-14 border-r border-[#C6D6E8]">№</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-left border-r border-[#C6D6E8]">Продукт</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center border-r border-[#C6D6E8]">Единица измерения</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center border-r border-[#C6D6E8]">Количество</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center border-r border-[#C6D6E8]">Цена</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center border-r border-[#C6D6E8]">Общая цена</th>
            <th class="p-3.5 text-[12px] font-bold text-[#3F5575] text-center w-20">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in items" :key="item.id" class="border-b last:border-0 border-[#C6D6E8]">
            <td class="p-3 text-center text-[#1B3E69] border-r border-[#C6D6E8] font-medium">{{ index + 1 }}</td>
            <td class="p-3 text-[#1B3E69] border-r border-[#C6D6E8] font-medium">{{ item.productName }}</td>
            <td class="p-3 text-center text-[#3F5575] border-r border-[#C6D6E8]">{{ item.unit }}</td>
            <td class="p-3 border-r border-[#C6D6E8] bg-[#F2F7FB]/30">
              <AppInput 
                v-model="item.quantity" 
                type="number" 
                step="0.01"
                placeholder="Кол."
                class="table-cell-input"
                :disabled="isReadOnly"
                @input="updateItemTotal(item)"
              />
            </td>
            <td class="p-3 border-r border-[#C6D6E8] bg-[#F2F7FB]/30">
              <AppInput 
                v-model="item.price" 
                type="number" 
                step="0.01"
                placeholder="Цена"
                class="table-cell-input"
                :disabled="isReadOnly"
                @input="updateItemTotal(item)"
              />
            </td>
            <td class="p-3 text-center font-bold text-[#1B3E69] border-r border-[#C6D6E8]">
              {{ (item.totalPrice || 0).toLocaleString('ru-RU') }}
            </td>
            <td class="p-3">
              <div class="flex justify-center">
                <button 
                  v-if="!isReadOnly"
                  class="p-2 text-[#FF3B30] hover:bg-red-50 rounded-[8px] transition-colors"
                  @click="removeProduct(index)"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div 
      v-else 
      class="w-full h-[280px] bg-[#F2F7FB] rounded-[10px] border border-dashed border-[#C6D6E8] flex flex-col items-center justify-center space-y-3"
    >
      <div class="p-4 bg-white/50 rounded-full border border-[#C6D6E8]/30">
         <Package2 class="w-16 h-16 text-[#C6D6E8]" />
      </div>
      <span class="text-[18px] font-bold text-[#C6D6E8] tracking-wide">Добавьте продукт</span>
    </div>

    <!-- Modals -->
    <SelectProductModal 
      :show="isSelectProductModalOpen"
      @close="isSelectProductModalOpen = false"
      @select="onProductSelect"
    />
  </div>
</template>

<style scoped>
:deep(.table-cell-input input) {
  background-color: #F2F7FB !important;
  border-color: #C6D6E8;
  height: 38px;
  text-align: center;
  font-weight: 500;
}

:deep(.table-cell-input input:focus) {
  background-color: white !important;
  border-color: #1B3E69;
}

th {
  text-transform: none;
  letter-spacing: 0.02em;
}
</style>
