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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
