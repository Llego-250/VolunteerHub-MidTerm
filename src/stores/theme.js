import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true) // Default to dark mode
  
  // Initialize theme from localStorage
  const initTheme = () => {
    const savedTheme = localStorage.getItem('volunteerHubTheme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    }
    applyTheme()
  }
  
  // Apply theme to document
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    } else {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    }
  }
  
  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('volunteerHubTheme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }
  
  // Set specific theme
  const setTheme = (dark) => {
    isDark.value = dark
    localStorage.setItem('volunteerHubTheme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }
  
  // Watch for changes
  watch(isDark, () => {
    applyTheme()
  })
  
  return {
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  }
})
