<template>
  <section class="browse-events">
    <h2>Browse Events</h2>
    <input v-model="search" placeholder="Search events..." />
    <div class="events-grid">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <i :class="eventsStore.categoryIcons[event.category] || 'fas fa-calendar'" class="icon"></i>
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} • {{ event.location }}</p>
        <p>{{ event.volunteers.length }}/{{ event.maxVolunteers }} volunteers</p>
        <button @click="register(event.id)" :disabled="isRegistered(event.id)">
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

const filteredEvents = computed(() => 
  eventsStore.events.filter(e => 
    e.title.toLowerCase().includes(search.value.toLowerCase()) && !e.status
  )
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
.browse-events { margin: 30px 0; }
input { width: 100%; padding: 10px; margin: 15px 0; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.event-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
.icon { font-size: 40px; color: var(--primary); margin-bottom: 10px; }
button { padding: 8px 16px; margin-top: 10px; cursor: pointer; }
button:disabled { background: #6c757d; cursor: not-allowed; }
</style>
