<template>
  <button @click="themeStore.toggleTheme()" class="theme-toggle" :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <Sun v-if="themeStore.isDark" :size="20" />
    <Moon v-else :size="20" />
  </button>
</template>

<script setup>
import { useThemeStore } from '../../stores/theme'
import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: currentColor;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.theme-toggle svg {
  transition: transform 0.3s ease;
}

.theme-toggle:hover svg {
  transform: rotate(20deg);
}

.light-theme .theme-toggle {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #059669;
}

.light-theme .theme-toggle:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  color: #10b981;
}

.dark-theme .theme-toggle {
  color: #10b981;
}

.dark-theme .theme-toggle:hover {
  color: #34d399;
}

/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(10px)) {
  .theme-toggle {
    background: rgba(255, 255, 255, 0.95);
  }
  
  .dark-theme .theme-toggle {
    background: rgba(0, 0, 0, 0.85);
  }
}
</style>
