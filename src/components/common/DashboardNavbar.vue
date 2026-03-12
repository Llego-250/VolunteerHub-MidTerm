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
