<template>
  <section class="browse-events">
    <div class="section-header">
      <h2>Discover Events</h2>
      <div class="filters">
        <select v-model="categoryFilter">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
        <input v-model="search" placeholder="Search events..." />
      </div>
    </div>
    <div class="events-grid">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <i :class="event.icon" class="event-icon"></i>
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <p class="category">{{ event.category }}</p>
          <p><i class="fas fa-calendar"></i> {{ event.date }} • {{ event.time }}</p>
          <p><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
          <p><i class="fas fa-users"></i> {{ event.volunteers.length }}/{{ event.maxVolunteers }} volunteers</p>
        </div>
        <button @click="register(event.id)" :disabled="isRegistered(event.id)" class="btn-register">
          {{ isRegistered(event.id) ? 'Registered' : 'Register' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const search = ref('')
const categoryFilter = ref('')
const categories = ['Environment', 'Education', 'Healthcare', 'Community', 'Animals', 'Disaster Relief', 'Elderly Care', 'Youth Programs']

const filteredEvents = computed(() => 
  eventsStore.events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || e.category === categoryFilter.value
    return matchesSearch && matchesCategory && !e.status
  })
)

const isRegistered = (eventId) => {
  const event = eventsStore.events.find(e => e.id === eventId)
  return event?.volunteers.includes(authStore.currentUser?.id)
}

const register = (eventId) => {
  eventsStore.registerForEvent(eventId, authStore.currentUser.id)
}
</script>

<style scoped>
.browse-events { margin-bottom: 40px; }
.section-header { margin-bottom: 20px; }
.section-header h2 { margin: 0 0 15px; font-size: 24px; }
.filters { display: flex; gap: 15px; }
.filters select, .filters input { padding: 10px 15px; border: 1px solid #ddd; border-radius: 8px; flex: 1; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.event-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 15px; }
.event-icon { font-size: 36px; color: var(--primary); }
.event-content h3 { margin: 0 0 5px; font-size: 18px; }
.event-content .category { display: inline-block; padding: 4px 12px; background: #e0f2fe; color: var(--primary); border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 10px; }
.event-content p { margin: 5px 0; color: var(--gray); font-size: 14px; }
.event-content p i { margin-right: 8px; color: var(--primary); }
.btn-register { padding: 10px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-register:hover { background: #059669; }
.btn-register:disabled { background: #9ca3af; cursor: not-allowed; }
</style>
