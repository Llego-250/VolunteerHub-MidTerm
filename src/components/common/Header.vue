<template>
  <header class="header">
    <div class="logo">
      <span class="logo-icon">🤝</span>
      <h2>VolunteerHub</h2>
    </div>
    <nav>
      <router-link :to="dashboardLink">Dashboard</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/settings">Settings</router-link>
      <div class="user-menu">
        <img src="https://via.placeholder.com/40" alt="User" class="avatar" />
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
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-size: 28px; }
.logo h2 { font-size: 20px; color: var(--primary); margin: 0; }
nav { display: flex; gap: 25px; align-items: center; }
a { color: var(--dark); font-weight: 500; padding: 8px 15px; border-radius: 6px; }
a:hover, a.router-link-active { background: var(--light-gray); color: var(--primary); }
.user-menu { display: flex; align-items: center; gap: 10px; margin-left: 20px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }
.btn-logout { padding: 8px 16px; font-size: 14px; }
</style>
