<template>
  <header class="nav-header">
    <div class="logo">
      <HandHeart :size="32" color="white" />
      <h1>VolunteerHub</h1>
    </div>
    <nav class="nav-links" :class="{ active: mobileMenuOpen }">
      <router-link v-if="authStore.isAuthenticated" :to="dashboardLink">Dashboard</router-link>
      <a v-else @click="scrollTo('home')">Home</a>
      <router-link to="/events">Events</router-link>
      <a v-if="!authStore.isAuthenticated" @click="scrollTo('about')">About</a>
      <router-link to="/contact">Contact</router-link>
      <router-link v-if="authStore.isAuthenticated" to="/profile">Profile</router-link>
    </nav>
    <div v-if="!authStore.isAuthenticated" class="auth-dropdown">
      <button @click="dropdownOpen = !dropdownOpen" class="btn-get-started">Get Started <ChevronDown :size="16" /></button>
      <div v-if="dropdownOpen" class="dropdown-menu">
        <button @click="$emit('showLogin'); dropdownOpen = false">Login</button>
        <button @click="$emit('showSignup'); dropdownOpen = false">Sign Up</button>
      </div>
    </div>
    <div v-else class="user-menu">
      <img src="https://via.placeholder.com/40" alt="User" class="avatar" />
      <span>{{ authStore.currentUser?.name }}</span>
      <button @click="handleLogout" class="btn-logout">Logout</button>
    </div>
    <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen">
      <Menu v-if="!mobileMenuOpen" :size="24" />
      <X v-else :size="24" />
    </button>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { HandHeart, ChevronDown, Menu, X } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)

defineEmits(['showLogin', 'showSignup'])

const dashboardLink = computed(() => 
  authStore.currentUser?.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard'
)

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  mobileMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 60px; background: rgba(102, 102, 102, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: none; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo h1 { font-size: 24px; color: white; margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: white; font-weight: 500; cursor: pointer; }
.nav-links a:hover { opacity: 0.8; }
.auth-dropdown { position: relative; }
.btn-get-started { display: flex; align-items: center; gap: 5px; }
.dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 10px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 150px; }
.dropdown-menu button { width: 100%; text-align: left; padding: 12px 20px; background: white; color: var(--dark); border-radius: 0; }
.dropdown-menu button:hover { background: var(--light-gray); }
.hamburger { display: none; background: none; border: none; color: white; cursor: pointer; }
.user-menu { display: flex; align-items: center; gap: 10px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }
.user-menu span { color: white; font-weight: 500; }
.btn-logout { padding: 8px 16px; font-size: 14px; }

@media (max-width: 768px) {
  .nav-header { padding: 15px 20px; }
  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
  .nav-links.active { display: flex; }
  .hamburger { display: block; }
  .auth-dropdown { display: none; }
}
</style>
