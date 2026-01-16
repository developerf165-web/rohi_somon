import { ref } from 'vue';

const isDark = ref(false);

const updateTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  isDark.value = theme === 'dark';
};

export function useTheme() {
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    updateTheme(newTheme);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      updateTheme(savedTheme);
    } else {
      updateTheme('light');
    }
  };

  return {
    isDark,
    toggleTheme,
    initTheme
  };
}
