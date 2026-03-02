<template>
  <section class="my-events">
    <div class="section-header">
      <h2>My Registered Events</h2>
      <select v-model="filter">
        <option value="all">All Events</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </select>
    </div>
    <div v-if="filteredEvents.length === 0" class="empty">No registered events</div>
    <div class="events-grid">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <i :class="event.icon" class="event-icon"></i>
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <p><i class="fas fa-calendar"></i> {{ event.date }} at {{ event.time }}</p>
          <p><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
          <span class="status">Registered</span>
        </div>
        <button @click="unregister(event.id)" class="btn-unregister">Unregister</button>
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
const filter = ref('all')

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.volunteers.includes(authStore.currentUser?.id))
)

const filteredEvents = computed(() => {
  if (filter.value === 'all') return myEvents.value
  const now = new Date()
  if (filter.value === 'upcoming') return myEvents.value.filter(e => new Date(e.date) > now)
  return myEvents.value.filter(e => new Date(e.date) <= now)
})

const unregister = (eventId) => {
  if (confirm('Are you sure you want to unregister?')) {
    eventsStore.unregisterFromEvent(eventId, authStore.currentUser.id)
  }
}
</script>

<style scoped>
.my-events { margin-bottom: 40px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.section-header h2 { margin: 0; font-size: 28px; color: #1f2937; font-weight: 700; }
.section-header select { padding: 10px 16px; border: 1px solid #d1d5db; border-radius: 8px; background: white; font-size: 14px; cursor: pointer; }
.empty { text-align: center; padding: 40px; color: var(--gray); }
.events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.event-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 15px; }
.event-icon { font-size: 36px; color: var(--primary); }
.event-content h3 { margin: 0 0 10px; font-size: 18px; }
.event-content p { margin: 5px 0; color: var(--gray); font-size: 14px; }
.event-content p i { margin-right: 8px; color: var(--primary); }
.status { display: inline-block; padding: 4px 12px; background: #dcfce7; color: #16a34a; border-radius: 12px; font-size: 12px; font-weight: 600; }
.btn-unregister { padding: 10px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-unregister:hover { background: #dc2626; }
</style>
