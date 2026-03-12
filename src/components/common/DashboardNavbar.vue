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
