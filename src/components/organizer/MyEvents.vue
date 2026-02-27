<template>
  <section class="my-events">
    <h2>My Events</h2>
    <div v-if="myEvents.length === 0">No events created</div>
    <div v-for="event in myEvents" :key="event.id" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date }} at {{ event.time }}</p>
      <p>Volunteers: {{ event.volunteers.length }}/{{ event.maxVolunteers }}</p>
      <div class="actions">
        <button @click="$router.push('/manage-events')">Manage</button>
        <button @click="deleteEvent(event.id)" class="danger">Delete</button>
      </div>
    </div>
  </section>
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

const deleteEvent = (id) => {
  if (confirm('Delete this event?')) {
    eventsStore.deleteEvent(id)
  }
}
</script>

<style scoped>
.my-events { margin: 30px 0; }
.event-card { border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; }
.actions { display: flex; gap: 10px; margin-top: 10px; }
button { padding: 8px 16px; cursor: pointer; }
.danger { background: #dc3545; color: white; }
</style>
