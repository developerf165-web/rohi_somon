import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home').then(m => m.HomePage),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login').then(m => m.LoginPage),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
