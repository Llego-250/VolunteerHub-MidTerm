<template>
  <div class="manage-events-panel">
    <h2>Manage Events</h2>
    <div v-for="event in myEvents" :key="event.id" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>Volunteers: {{ event.volunteers.length }}/{{ event.maxVolunteers }}</p>
      <button @click="viewDetails(event)">View Details</button>
      <button @click="deleteEvent(event.id)" class="danger">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'

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
.manage-events-panel { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 20px; }
.event-card { border: 1px solid var(--border); padding: 20px; margin: 15px 0; border-radius: 8px; }
button { padding: 8px 16px; margin-right: 10px; }
.danger { background: #dc3545; color: white; }
</style>
