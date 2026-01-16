<script setup lang="ts">
import { IconSettings, IconLogout } from '@/shared/assets/icons';
import { 
  MapPin, 
  Users, 
  Plane, 
  CalendarDays,
  Warehouse,
  FileText,
  Truck,
  ArrowRightLeft,
  Banknote,
  Clock,
  ShoppingCart
} from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuItems = [
  { id: 'points', label: 'Точки', icon: MapPin, path: '/points' },
  { id: 'arrival', label: 'Приход', icon: ArrowRightLeft, path: '/arrival' },
  { id: 'expense', label: 'Расход', icon: ArrowRightLeft, path: '/expense' },
  { id: 'cashbox', label: 'Касса', icon: Banknote, path: '/cashbox' },
  { id: 'suppliers', label: 'Поставщики', icon: Truck, path: '/suppliers' },
  { id: 'sklad', label: 'Склад', icon: Warehouse, path: '/sklad' },
  { id: 'nomenclature', label: 'Номенклатура', icon: FileText, path: '/nomenclature' },
  { id: 'kadr', label: 'Сотрудники', icon: Users, path: '/kadr' },
  { id: 'shift', label: 'Смена', icon: Clock, path: '/shift' }, // Added 'Смена' menu item
  { id: 'sale', label: 'Продажа', icon: ShoppingCart, path: '/sale' },
  { id: 'encashment', label: 'Инкассация', icon: ArrowRightLeft, path: '/encashment' },
  { id: 'vacations', label: 'Отпуска, отгулы', icon: Plane, path: '/vacations' },
  { id: 'schedules', label: 'Расписания', icon: CalendarDays, path: '/schedules' },
];

const bottomItems = [
  { id: 'settings', label: 'Настройка', icon: IconSettings, path: '/settings' },
  { id: 'logout', label: 'Выход', icon: IconLogout, path: '/login', isLogout: true },
];

const navigate = (path: string, isLogout?: boolean) => {
  if (isLogout) {
    // Handle logout logic if needed
  }
  router.push(path);
};

const isActive = (path: string) => route.path === path;
</script>

<template>
  <aside 
    class="w-[210px] h-full bg-[#F8FAFC] border-r border-[#C6D6E8] flex flex-col justify-between py-[30px]"
  >
    <!-- Top Menu -->
    <nav class="flex flex-col gap-2 flex-1 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.id"
        class="flex items-center gap-[10px] px-[30px] py-3 transition-all duration-200 group relative"
        :class="[
          isActive(item.path) 
            ? 'text-[#127EEE]' 
            : 'text-[#3F5575] hover:bg-[#F1F5F9]'
        ]"
        @click="navigate(item.path)"
      >
        <component 
          :is="item.icon" 
          class="w-[17px] h-[17px] transition-colors"
          :class="isActive(item.path) ? 'text-[#127EEE]' : 'text-[#3F5575] group-hover:text-[#1B3E69]'"
        />
        <span class="text-[13px] font-medium leading-[21px]">
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Bottom Menu -->
    <nav class="flex flex-col gap-2 mt-auto">
      <button
        v-for="item in bottomItems"
        :key="item.id"
        class="flex items-center gap-[10px] px-[30px] py-3 transition-all duration-200 group"
        :class="[
          isActive(item.path) 
            ? 'text-[#127EEE]' 
            : 'text-[#3F5575] hover:bg-[#F1F5F9]'
        ]"
        @click="navigate(item.path, item.isLogout)"
      >
        <component 
          :is="item.icon" 
          class="w-[17px] h-[17px] transition-colors"
          :class="isActive(item.path) ? 'text-[#127EEE]' : 'text-[#3F5575] group-hover:text-[#1B3E69]'"
        />
        <span class="text-[13px] font-medium leading-[21px]">
          {{ item.label }}
        </span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
/* Custom subtle scrollbar if needed */
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-thumb {
  background: #C6D6E8;
  border-radius: 10px;
}
</style>
