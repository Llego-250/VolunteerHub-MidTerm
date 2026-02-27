<template>
  <div class="manage-events">
    <h1>Manage Events</h1>
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
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'

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
.manage-events { padding: 40px; }
.event-card { border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; }
button { padding: 8px 16px; margin-right: 10px; }
.danger { background: #dc3545; color: white; }
</style>
