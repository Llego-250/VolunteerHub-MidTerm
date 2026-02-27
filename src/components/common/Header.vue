<template>
  <header class="header">
    <h2>VolunteerHub</h2>
    <nav>
      <router-link :to="dashboardLink">Dashboard</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/settings">Settings</router-link>
      <button @click="handleLogout">Logout</button>
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
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f8f9fa; margin-bottom: 20px; }
nav { display: flex; gap: 15px; align-items: center; }
a { text-decoration: none; color: #007bff; }
button { padding: 8px 16px; cursor: pointer; }
</style>
