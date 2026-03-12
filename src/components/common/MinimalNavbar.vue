<template>
  <header class="minimal-nav-wrapper">
    <nav class="minimal-nav">
      <div class="nav-content">
        <div class="nav-logo">VolunteerHub</div>
        
        <div class="nav-actions">
          <ThemeToggle />
          
          <!-- Not authenticated - show auth dropdown -->
          <div v-if="!authStore.isAuthenticated" class="auth-dropdown">
            <button @click="authDropdownOpen = !authDropdownOpen" class="nav-link nav-link-auth">
              Get Started
              <i class="fas fa-chevron-down" :class="{ 'rotate': authDropdownOpen }"></i>
            </button>
            <div v-if="authDropdownOpen" class="dropdown-menu">
              <button @click="handleShowLogin" class="dropdown-item">
                <i class="fas fa-sign-in-alt"></i>
                Log in
              </button>
              <button @click="handleShowSignup" class="dropdown-item">
                <i class="fas fa-user-plus"></i>
                Sign up
              </button>
            </div>
          </div>
          
          <!-- Authenticated - show user dropdown -->
          <div v-else class="user-dropdown">
            <div class="avatar-circle" @click="userDropdownOpen = !userDropdownOpen">
              <img v-if="authStore.currentUser?.profilePic" :src="authStore.currentUser.profilePic" alt="Profile" />
              <span v-else>{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</span>
            </div>
            <div v-if="userDropdownOpen" class="dropdown-menu">
              <button @click="goToDashboard" class="dropdown-item">
                <i class="fas fa-th-large"></i>
                Dashboard
              </button>
              <button @click="handleLogout" class="dropdown-item">
                <i class="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const authStore = useAuthStore()
const router = useRouter()
const userDropdownOpen = ref(false)
const authDropdownOpen = ref(false)

const emit = defineEmits(['showLogin', 'showSignup'])

const handleShowLogin = () => {
  authDropdownOpen.value = false
  emit('showLogin')
}

const handleShowSignup = () => {
  authDropdownOpen.value = false
  emit('showSignup')
}

const dashboardLink = computed(() => 
  authStore.currentUser?.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard'
)

const goToDashboard = () => {
  userDropdownOpen.value = false
  router.push(dashboardLink.value)
}

const handleLogout = () => {
  authStore.logout()
  userDropdownOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.minimal-nav-wrapper {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.minimal-nav {
  max-width: 1200px;
  width: 40%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 15px;
  transition: all 0.3s ease;
}

.nav-logo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}

.nav-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-link {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  background: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.05);
}

.nav-link-auth {
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link-auth:hover {
  background: rgba(0, 0, 0, 0.95);
}

.nav-link-auth i {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.nav-link-auth i.rotate {
  transform: rotate(180deg);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
}

.auth-dropdown,
.user-dropdown {
  position: relative;
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.avatar-circle:hover {
  transform: scale(1.05);
  border-color: rgba(0, 0, 0, 0.2);
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 160px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border: none;
  color: #2c2c2c;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.dropdown-item i {
  flex-shrink: 0;
  width: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .minimal-nav {
    width: 95%;
  }
  
  .nav-content {
    padding: 10px 16px;
  }
  
  .nav-logo {
    font-size: 16px;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 6px 12px;
  }
  
  .user-name {
    display: none;
  }
  
  .avatar-circle {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
}
</style>
