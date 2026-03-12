<template>
  <header class="minimal-nav-wrapper">
    <nav class="minimal-nav">
      <div class="nav-content">
        <div class="nav-logo">VolunteerHub</div>
        
        <!-- Not authenticated - show login/signup -->
        <div v-if="!authStore.isAuthenticated" class="nav-actions">
          <button @click="$emit('showLogin')" class="nav-link">Log in</button>
          <button @click="$emit('showSignup')" class="nav-link nav-link-signup">Sign up</button>
        </div>
        
        <!-- Authenticated - show user info -->
        <div v-else class="nav-actions">
          <div class="user-dropdown">
            <div class="avatar-circle" @click="userDropdownOpen = !userDropdownOpen">
              <img v-if="authStore.currentUser?.profilePic" :src="authStore.currentUser.profilePic" alt="Profile" />
              <span v-else>{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</span>
            </div>
            <div v-if="userDropdownOpen" class="dropdown-menu">
              <button @click="goToDashboard" class="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Dashboard
              </button>
              <button @click="handleLogout" class="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
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

const authStore = useAuthStore()
const router = useRouter()
const userDropdownOpen = ref(false)

defineEmits(['showLogin', 'showSignup'])

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

.nav-link-signup {
  background: rgba(0, 0, 0, 0.85);
  color: white;
}

.nav-link-signup:hover {
  background: rgba(0, 0, 0, 0.95);
}

.nav-link-signup:hover {
  background: rgba(0, 0, 0, 0.95);
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

.dropdown-item svg {
  flex-shrink: 0;
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
