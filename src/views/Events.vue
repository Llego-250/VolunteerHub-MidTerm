<template>
  <div class="events">
    <header class="nav-header">
      <div class="logo">
        <span class="logo-icon">🤝</span>
        <h1>VolunteerHub</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/events">Events</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <div class="user-info" v-if="authStore.currentUser">
        <img src="https://via.placeholder.com/40" class="avatar" />
        <span>{{ authStore.currentUser.name }}</span>
      </div>
    </header>
    <div class="hero-section">
      <h1>Volunteer Events</h1>
      <p>Discover meaningful opportunities to make a difference in your community</p>
    </div>
    <div class="container">
      <div class="browse-section">
        <h2>Browse Events</h2>
        <div class="filters">
          <select v-model="category">
            <option value="">All Categories</option>
            <option>Environment</option>
            <option>Community</option>
            <option>Education</option>
          </select>
          <input v-model="search" placeholder="Search events..." />
        </div>
        <div v-if="filteredEvents.length === 0" class="error">Error loading events</div>
        <div v-else class="events-grid">
          <div v-for="event in filteredEvents" :key="event.id" class="event-card">
            <div class="event-header" :style="{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }">
              <span class="event-icon">{{ event.icon }}</span>
            </div>
            <div class="event-body">
              <span class="category-badge">{{ event.category }}</span>
              <h3>{{ event.title }}</h3>
              <div class="event-meta">
                <span>📅 {{ event.date }}</span>
                <span>🕐 {{ event.time }}</span>
                <span>📍 {{ event.location }}</span>
              </div>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import { useAuthStore } from '../stores/auth'

const eventsStore = useEventsStore()
const authStore = useAuthStore()
const search = ref('')
const category = ref('')

const filteredEvents = computed(() => 
  eventsStore.events.filter(e => 
    e.title.toLowerCase().includes(search.value.toLowerCase()) &&
    (category.value === '' || e.category === category.value)
  )
)
</script>

<style scoped>
.events { background: var(--light-gray); min-height: 100vh; }
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-size: 32px; }
.logo h1 { font-size: 24px; color: var(--primary); margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: var(--dark); font-weight: 500; }
.user-info { display: flex; align-items: center; gap: 10px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; }
.hero-section { background: white; padding: 60px; text-align: center; }
.hero-section h1 { font-size: 42px; margin-bottom: 15px; }
.hero-section p { color: var(--gray); font-size: 18px; }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.browse-section { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.browse-section h2 { font-size: 28px; margin-bottom: 25px; }
.filters { display: flex; gap: 20px; margin-bottom: 30px; }
.filters select, .filters input { flex: 1; }
.error { text-align: center; padding: 40px; color: var(--gray); }
.events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
.event-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); transition: transform 0.3s; }
.event-card:hover { transform: translateY(-5px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.event-header { height: 180px; display: flex; align-items: center; justify-content: center; }
.event-icon { font-size: 70px; }
.event-body { padding: 20px; }
.category-badge { background: var(--primary); color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.event-body h3 { margin: 12px 0; font-size: 18px; }
.event-meta { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; color: var(--gray); font-size: 13px; }
.event-body p { color: var(--gray); font-size: 14px; line-height: 1.5; }
</style>
