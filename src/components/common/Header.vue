<template>
  <header class="header">
    <div class="logo">
      <HandHeart :size="28" color="#10b981" />
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
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: rgba(0,0,0,0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: none; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo h2 { font-size: 20px; color: white; margin: 0; }
nav { display: flex; gap: 25px; align-items: center; }
a { color: white; font-weight: 500; padding: 8px 15px; border-radius: 6px; }
a:hover, a.router-link-active { background: rgba(255,255,255,0.2); color: white; }
.user-menu { display: flex; align-items: center; gap: 10px; margin-left: 20px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }
.btn-logout { padding: 8px 16px; font-size: 14px; }
</style>
