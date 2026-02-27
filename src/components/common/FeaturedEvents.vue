<template>
  <section class="featured">
    <h2>Featured Events</h2>
    <div class="events-grid">
      <div v-for="event in featuredEvents" :key="event.id" class="event-card">
        <span class="icon">{{ event.icon }}</span>
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} • {{ event.location }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useEventsStore } from '../../stores/events'

const eventsStore = useEventsStore()
const featuredEvents = computed(() => eventsStore.events.slice(0, 3))
</script>

<style scoped>
.featured { margin: 40px 0; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
.event-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; text-align: center; }
.icon { font-size: 40px; }
</style>
