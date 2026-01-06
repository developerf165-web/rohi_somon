import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/home/HomePage.vue';
import LoginPage from '@/pages/login/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/points/add',
    name: 'add-point',
    component: () => import('@/pages/add-point').then(m => m.AddPointPage),
  },
  {
    path: '/points/edit/:id',
    name: 'edit-point',
    component: () => import('@/pages/add-point').then(m => m.AddPointPage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/points/view/:id',
    name: 'view-point',
    component: () => import('@/pages/add-point').then(m => m.AddPointPage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
  {
    path: '/points/map/:id',
    name: 'map-point',
    component: () => import('@/pages/add-point').then(m => m.AddPointPage),
    props: (route: any) => ({ id: route.params.id, mode: 'map' }),
  },
  {
    path: '/kadr',
    name: 'kadr',
    component: () => import('@/pages/kadr').then(m => m.KadrPage),
  },
  {
    path: '/vacations',
    name: 'vacations',
    component: () => import('@/pages/vacations').then(m => m.VacationsPage),
  },

  {
    path: '/sklad',
    name: 'sklad',
    component: () => import('@/pages/sklad'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sklad/add',
    name: 'sklad-add',
    component: () => import('@/pages/add-sklad').then(m => m.AddSkladPage),
  },
  {
    path: '/sklad/edit/:id',
    name: 'sklad-edit',
    component: () => import('@/pages/add-sklad').then(m => m.AddSkladPage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/sklad/view/:id',
    name: 'sklad-view',
    component: () => import('@/pages/add-sklad').then(m => m.AddSkladPage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
  {
    path: '/nomenclature',
    name: 'nomenclature',
    component: () => import('@/pages/nomenclature').then(m => m.NomenclaturePage),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nomenclature/add',
    name: 'nomenclature-add',
    component: () => import('@/pages/add-nomenclature').then(m => m.AddNomenclaturePage),
  },
  {
    path: '/nomenclature/edit/:id',
    name: 'nomenclature-edit',
    component: () => import('@/pages/add-nomenclature').then(m => m.AddNomenclaturePage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/nomenclature/view/:id',
    name: 'nomenclature-view',
    component: () => import('@/pages/add-nomenclature').then(m => m.AddNomenclaturePage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
  {
    path: '/schedules',
    name: 'schedules',
    component: () => import('@/pages/schedules').then(m => m.SchedulesPage),
  },
  {
    path: '/schedules/add',
    name: 'schedules-add',
    component: () => import('@/pages/schedules').then(m => m.AddSchedulePage),
  },
  {
    path: '/schedules/edit/:id',
    name: 'schedules-edit',
    component: () => import('@/pages/schedules').then(m => m.AddSchedulePage),
    props: true,
  },
  {
    path: '/schedules/:id',
    name: 'schedules-view',
    component: () => import('@/pages/schedules').then(m => m.AddSchedulePage),
    props: true,
  },
  {
    path: '/kadr/add',
    name: 'kadr-add',
    component: () => import('@/pages/kadr/AddKadrPage.vue'),
  },
  {
    path: '/kadr/edit/:id',
    name: 'kadr-edit',
    component: () => import('@/pages/kadr/AddKadrPage.vue'),
    props: true,
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('@/pages/suppliers').then(m => m.default),
  },
  {
    path: '/suppliers/add',
    name: 'suppliers-add',
    component: () => import('@/pages/add-supplier').then(m => m.AddSupplierPage),
  },
  {
    path: '/suppliers/edit/:id',
    name: 'suppliers-edit',
    component: () => import('@/pages/add-supplier').then(m => m.AddSupplierPage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/suppliers/view/:id',
    name: 'suppliers-view',
    component: () => import('@/pages/add-supplier').then(m => m.AddSupplierPage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
  {
    path: '/arrival',
    name: 'arrival',
    component: () => import('@/pages/arrival/ui/ArrivalPage.vue'),
  },
  {
    path: '/arrival/add',
    name: 'arrival-add',
    component: () => import('@/pages/add-arrival').then(m => m.AddArrivalPage),
  },
  {
    path: '/arrival/edit/:id',
    name: 'arrival-edit',
    component: () => import('@/pages/add-arrival').then(m => m.AddArrivalPage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/arrival/view/:id',
    name: 'arrival-view',
    component: () => import('@/pages/add-arrival').then(m => m.AddArrivalPage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
  {
    path: '/expense',
    name: 'expense',
    component: () => import('@/pages/expense/ui/ExpensePage.vue'),
  },
  {
    path: '/expense/add',
    name: 'expense-add',
    component: () => import('@/pages/add-expense').then(m => m.AddExpensePage),
  },
  {
    path: '/expense/edit/:id',
    name: 'expense-edit',
    component: () => import('@/pages/add-expense').then(m => m.AddExpensePage),
    props: (route: any) => ({ id: route.params.id, mode: 'edit' }),
  },
  {
    path: '/expense/view/:id',
    name: 'expense-view',
    component: () => import('@/pages/add-expense').then(m => m.AddExpensePage),
    props: (route: any) => ({ id: route.params.id, mode: 'view' }),
  },
];


export const router = createRouter({
  history: createWebHistory(),
  routes,
});
