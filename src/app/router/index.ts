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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
