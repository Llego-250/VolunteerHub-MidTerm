<template>
  <aside class="sidebar">
    <div class="profile-avatar" v-if="currentUser" 
         :style="currentUser.profilePicture ? { backgroundImage: `url(${currentUser.profilePicture})` } : {}">
      <span v-if="!currentUser.profilePicture">{{ currentUser.name?.charAt(0).toUpperCase() }}</span>
    </div>
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
}
.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  color: #1f2937;
  background-size: cover;
  background-position: center;
  border: 2px solid white;
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
  transition: all 0.3s;
}
.sidebar button:hover { 
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}
.sidebar button.active { 
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.sidebar button i { 
  font-size: 22px; 
  color: #1f2937;
}
.sidebar button .badge { 
  position: absolute; 
  top: -5px;
  right: -5px; 
  background: #ef4444; 
  color: white; 
  border-radius: 50%; 
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}
</style>