<template>
  <div class="manage-events">
    <Navbar />
    <div class="container">
      <h1>Manage Events</h1>
      <div v-for="event in myEvents" :key="event.id" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>Volunteers: {{ event.volunteers.length }}/{{ event.maxVolunteers }}</p>
      <button @click="viewDetails(event)">View Details</button>
      <button @click="deleteEvent(event.id)" class="danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
)

const viewDetails = (event) => {
  alert(`Event: ${event.title}\nVolunteers: ${event.volunteers.length}`)
}

const deleteEvent = (id) => {
  if (confirm('Delete this event?')) {
    eventsStore.deleteEvent(id)
  }
}
</script>

<style scoped>
.manage-events { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { padding: 40px; max-width: 1200px; margin: 0 auto; }
.event-card { border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; }
button { padding: 8px 16px; margin-right: 10px; }
.danger { background: #dc3545; color: white; }
</style>
