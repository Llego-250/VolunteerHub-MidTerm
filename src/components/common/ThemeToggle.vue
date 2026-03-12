<template>
  <button @click="themeStore.toggleTheme()" class="theme-toggle" :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <i :class="themeStore.isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
  </button>
</template>

<script setup>
import { useThemeStore } from '../../stores/theme'

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

.theme-toggle i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.theme-toggle:hover i {
  transform: rotate(20deg);
}

.light-theme .theme-toggle {
  background: rgba(185, 185, 185, 0.2);
  border: 1px solid rgba(153, 153, 153, 0.662);
  color: #000000;
}

.light-theme .theme-toggle:hover {
  background: rgba(185, 185, 185, 0.2);
  border-color: #000000;
  color: #3d3d3d;
}

.dark-theme .theme-toggle {
  color: #000000;
}

.dark-theme .theme-toggle:hover {
  color: #3d3d3d;
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
