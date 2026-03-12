<template>
  <header class="minimal-nav-wrapper">
    <nav class="minimal-nav" :class="{ 'search-expanded': searchExpanded }">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">VolunteerHub</router-link>
        
        <div class="nav-search" v-if="searchExpanded">
          <i class="fas fa-search"></i>
          <input 
            ref="searchInput"
            v-model="searchQuery" 
            @input="handleSearch"
            @blur="handleBlur"
            placeholder="Search events, categories, or locations..." 
          />
          <button @click="closeSearch" class="btn-close-search">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="nav-actions">
          <button v-if="!searchExpanded" @click="openSearch" class="btn-search">
            <i class="fas fa-search"></i>
          </button>
          
          <div class="user-dropdown">
            <div class="avatar-circle" @click="userDropdownOpen = !userDropdownOpen">
              <img v-if="authStore.currentUser?.profilePic" :src="authStore.currentUser.profilePic" alt="Profile" />
              <span v-else>{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</span>
            </div>
            <div v-if="userDropdownOpen" class="dropdown-menu">
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
    <input type="file" ref="fileInput" @change="handleProfileUpload" accept="image/*" style="display: none" />
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const userDropdownOpen = ref(false)
const fileInput = ref(null)
const searchQuery = ref('')
const searchExpanded = ref(false)
const searchInput = ref(null)

const emit = defineEmits(['search'])

const openSearch = async () => {
  searchExpanded.value = true
  await nextTick()
  searchInput.value?.focus()
}

const closeSearch = () => {
  searchExpanded.value = false
  searchQuery.value = ''
  emit('search', '')
}

const handleBlur = () => {
  // Delay to allow click on close button
  setTimeout(() => {
    if (!searchQuery.value) {
      searchExpanded.value = false
    }
  }, 200)
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const triggerUpload = () => {
  userDropdownOpen.value = false
  fileInput.value?.click()
}

const handleProfileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      authStore.updateProfile({ profilePic: event.target.result })
    }
    reader.readAsDataURL(file)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  userDropdownOpen.value = false
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

.minimal-nav.search-expanded {
  max-width: 800px;
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
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.nav-logo:hover {
  opacity: 0.7;
}

.nav-search {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 6px 12px;
  gap: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
  animation: expandSearch 0.3s ease-out;
  height: 36px;
}

@keyframes expandSearch {
  from {
    opacity: 0;
    transform: scaleX(0.8);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.nav-search:focus-within {
  background: white;
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.nav-search i {
  color: #9ca3af;
  font-size: 13px;
  flex-shrink: 0;
}

.nav-search input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  outline: none;
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  height: 100%;
}

.nav-search input::placeholder {
  color: #9ca3af;
}

.btn-close-search {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;
  font-size: 12px;
}

.btn-close-search:hover {
  color: #1a1a1a;
}

.nav-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-search {
  background: rgba(16, 185, 129, 0.1);
  border: none;
  color: #10b981;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-search:hover {
  background: rgba(16, 185, 129, 0.2);
  transform: scale(1.05);
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
  
  .minimal-nav.search-expanded {
    max-width: 95%;
  }
  
  .nav-content {
    padding: 8px 16px;
    gap: 10px;
  }
  
  .nav-logo {
    font-size: 16px;
  }
  
  .nav-search input::placeholder {
    font-size: 13px;
  }
  
  .avatar-circle {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
  
  .btn-search {
    width: 32px;
    height: 32px;
  }
}
</style>
