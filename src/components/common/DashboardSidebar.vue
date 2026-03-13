<template>
  <aside class="sidebar">
    <nav>
      <button 
        v-for="item in sidebarItems" 
        :key="item.id"
        @click="$emit('navigate', item.id)" 
        :class="{ active: activeTab === item.id }"
      >
        <i :class="item.icon"></i>
        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.currentUser)

const props = defineProps({
  role: String,
  activeTab: String
})
defineEmits(['navigate'])

const sidebarItems = computed(() => {
  if (props.role === 'organizer') {
    return [
      { id: 'overview', icon: 'fas fa-calendar-check' },
      { id: 'manage', icon: 'fas fa-tasks' },
      { id: 'message', icon: 'fas fa-envelope' },
      { id: 'profile', icon: 'fas fa-user' },
      { id: 'notifications', icon: 'fas fa-bell' },
      { id: 'calendar', icon: 'fas fa-calendar' }
    ]
  }
  return [
    { id: 'browse', icon: 'fas fa-search' },
    { id: 'registered', icon: 'fas fa-calendar-check' },
    { id: 'profile', icon: 'fas fa-user' },
    { id: 'notifications', icon: 'fas fa-bell' },
    { id: 'calendar', icon: 'fas fa-calendar' }
  ]
})
</script>

<style scoped>
.sidebar { 
  width: 70px; 
  background: linear-gradient(180deg, #d4f4dd 0%, #a8e6cf 50%, #56c596 100%); 
  height: auto;
  min-height: 400px;
  position: fixed; 
  left: 0; 
  top: 150px; 
  border-radius: 0 30px 30px 0;
  padding: 20px 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 98;
}

/* Dark Theme Sidebar */
.dark-theme .sidebar {
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(0, 0, 0, 0.95) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.sidebar nav { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  width: 100%;
  align-items: center;
}

.sidebar button { 
  width: 50px;
  height: 50px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: rgba(255, 255, 255, 0.3); 
  border: none; 
  border-radius: 12px;
  cursor: pointer; 
  position: relative;
  transition: all 0.3s ease;
}

.sidebar button:hover { 
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.sidebar button.active { 
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Dark Theme Buttons */
.dark-theme .sidebar button {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.dark-theme .sidebar button:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
}

.dark-theme .sidebar button.active {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #10b981;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.5);
}

.sidebar button i { 
  font-size: 22px; 
  color: #1f2937;
  transition: all 0.3s ease;
}

.sidebar button:hover i {
  transform: scale(1.1);
}

.dark-theme .sidebar button i {
  color: #10b981;
}

.dark-theme .sidebar button.active i {
  color: white;
}

.sidebar button .badge { 
  position: absolute; 
  top: -5px;
  right: -5px; 
  background: linear-gradient(135deg, #ef4444, #dc2626); 
  color: white; 
  border-radius: 50%; 
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  transition: all 0.3s ease;
}

.sidebar button:hover .badge {
  transform: scale(1.1);
}

.dark-theme .sidebar button .badge {
  box-shadow: 0 2px 12px rgba(239, 68, 68, 0.6);
}
</style>