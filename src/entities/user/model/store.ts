import { defineStore } from 'pinia';
import type { User, UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
    isLoading: false,
  }),

  actions: {
    setAuth(user: User, token: string) {
      this.currentUser = user;
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('auth_token', token);
    },
    
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    clearAuth() {
      this.currentUser = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('auth_token');
    },

    async logout() {
      // Here you could also call a backend logout API if needed
      this.clearAuth();
    },
  },
});
