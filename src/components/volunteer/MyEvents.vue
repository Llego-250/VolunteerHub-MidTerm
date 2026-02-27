<template>
  <section class="my-events">
    <h2>My Events</h2>
    <div v-if="myEvents.length === 0">No registered events</div>
    <div v-for="event in myEvents" :key="event.id" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date }} at {{ event.time }}</p>
      <p>{{ event.location }}</p>
      <button @click="unregister(event.id)">Unregister</button>
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
  eventsStore.events.filter(e => e.volunteers.includes(authStore.currentUser?.id))
)

const unregister = (eventId) => {
  eventsStore.unregisterFromEvent(eventId, authStore.currentUser.id)
}
</script>

<style scoped>
.my-events { margin: 30px 0; }
.event-card { border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; }
button { padding: 8px 16px; background: #dc3545; color: white; border: none; cursor: pointer; }
</style>
