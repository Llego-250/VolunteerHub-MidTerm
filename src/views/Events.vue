<template>
  <div class="events">
    <h1>Browse Events</h1>
    <input v-model="search" placeholder="Search events..." />
    <div class="event-list">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} at {{ event.time }}</p>
        <p>{{ event.location }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'

const eventsStore = useEventsStore()
const search = ref('')
const filteredEvents = computed(() => 
  eventsStore.events.filter(e => e.title.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<style scoped>
.events { padding: 40px; }
input { width: 100%; padding: 10px; margin: 20px 0; }
.event-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.event-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
</style>
