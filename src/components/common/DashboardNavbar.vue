<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <router-link to="/">
            <i class="fas fa-hands-helping"></i>
            <span>VolunteerHub</span>
          </router-link>
        </div>

        <div class="nav-auth">
          <div class="user-dropdown">
            <div class="user-avatar" @click="userDropdownOpen = !userDropdownOpen">
              <div class="avatar-circle">{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</div>
              <span>{{ authStore.currentUser?.name }}</span>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div v-if="userDropdownOpen" class="dropdown-menu">
              <a href="#" @click.prevent="showProfile"><i class="fas fa-user"></i> Profile</a>
              <a href="#" @click.prevent="showSettings"><i class="fas fa-cog"></i> Settings</a>
              <a href="#" @click.prevent="handleLogout"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const userDropdownOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  userDropdownOpen.value = false
}

const showProfile = () => {
  userDropdownOpen.value = false
}

const showSettings = () => {
  userDropdownOpen.value = false
}
</script>

<style scoped>
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(102, 102, 102, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.navbar { width: 100%; }
.nav-container { display: flex; justify-content: space-between; align-items: center; padding: 10px 60px; }
.nav-logo a { display: flex; align-items: center; gap: 10px; color: white; text-decoration: none; font-size: 24px; font-weight: 600; }
.nav-logo i { font-size: 28px; }
.user-dropdown { position: relative; }
.user-avatar { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 5px 10px; border-radius: 8px; transition: background 0.2s; }
.user-avatar:hover { background: rgba(255, 255, 255, 0.1); }
.avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; }
.user-avatar span { color: white; font-weight: 500; }
.user-avatar i { color: white; font-size: 12px; }
.dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 10px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px; overflow: hidden; }
.dropdown-menu a { display: flex; align-items: center; gap: 10px; padding: 12px 20px; color: var(--dark); text-decoration: none; transition: background 0.2s; }
.dropdown-menu a:hover { background: var(--light-gray); }
.dropdown-menu i { width: 16px; }
</style>
