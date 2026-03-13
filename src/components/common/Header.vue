<template>
  <header class="header">
    <div class="logo">
      <HandHeart :size="28" color="white" />
      <h2>VolunteerHub</h2>
    </div>
    <nav>
      <router-link :to="dashboardLink">Dashboard</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/settings">Settings</router-link>
      <div class="user-menu">
        <div class="avatar" :style="authStore.currentUser?.profilePicture ? `background-image: url(${authStore.currentUser.profilePicture})` : ''">
          <span v-if="!authStore.currentUser?.profilePicture">{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</span>
        </div>
        <span>{{ authStore.currentUser?.name }}</span>
        <button @click="handleLogout" class="btn-logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { HandHeart } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const dashboardLink = computed(() => 
  authStore.currentUser?.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard'
)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 20px 60px; 
  background: var(--dashboard-navbar-bg, rgba(0,0,0,0.3)); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  z-index: 100;
  border-bottom: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.logo { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.logo h2 { 
  font-size: 20px; 
  color: var(--text-primary, white); 
  margin: 0;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

nav { 
  display: flex; 
  gap: 25px; 
  align-items: center; 
}

a { 
  color: var(--text-primary, white); 
  font-weight: 500; 
  padding: 8px 15px; 
  border-radius: 6px;
  transition: all 0.3s ease;
  text-decoration: none;
}

a:hover, a.router-link-active { 
  background: rgba(16, 185, 129, 0.2); 
  color: var(--accent-primary, white);
  transform: translateY(-2px);
}

.user-menu { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-left: 20px; 
}

.user-menu span {
  color: var(--text-primary, white);
  font-weight: 500;
  transition: all 0.3s ease;
}

.avatar { 
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3)); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-weight: 600; 
  color: white; 
  background-size: cover; 
  background-position: center;
  border: 2px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
  transform: scale(1.05);
}

.btn-logout { 
  padding: 8px 16px; 
  font-size: 14px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  transition: all 0.3s ease;
}

.btn-logout:hover {
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #059669, #047857);
}
</style>
