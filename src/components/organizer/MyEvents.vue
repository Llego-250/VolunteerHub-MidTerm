<template>
  <section class="my-events">
    <div class="section-header">
      <h2>My Events</h2>
      <select class="filter-select">
        <option>All Events</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
    </div>
    <div v-if="myEvents.length === 0" class="empty-state">
      <div class="empty-icon"><i class="fas fa-calendar" style="font-size: 80px; color: #9ca3af;"></i></div>
      <h3>No Events Created</h3>
      <p>Start by creating your first event to connect with volunteers!</p>
      <button @click="$emit('switchTab', 'create')">Create Event</button>
    </div>
    <div v-else class="events-list">
      <div v-for="event in myEvents" :key="event.id" class="event-item">
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} at {{ event.time }}</p>
        <p>Volunteers: {{ event.volunteers.length }}/{{ event.maxVolunteers }}</p>
        <div class="actions">
          <button @click="$emit('switchTab', 'manage')" class="btn-manage">Manage</button>
          <button @click="deleteEvent(event.id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'

defineEmits(['switchTab'])

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
.my-events { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.section-header h2 { font-size: 24px; margin: 0; }
.filter-select { padding: 8px 15px; border: 1px solid var(--border); border-radius: 8px; }
.empty-state { text-align: center; padding: 60px 20px; }
.empty-icon { margin-bottom: 20px; }
.empty-state h3 { font-size: 20px; margin-bottom: 10px; }
.empty-state p { color: var(--gray); margin-bottom: 25px; }
.events-list { display: grid; gap: 20px; }
.event-item { border: 1px solid var(--border); padding: 20px; border-radius: 8px; }
.event-item h3 { margin: 0 0 10px; }
.event-item p { color: var(--gray); margin: 5px 0; font-size: 14px; }
.actions { display: flex; gap: 10px; margin-top: 15px; }
.btn-manage { background: var(--primary); color: white; }
.btn-delete { background: #ef4444; color: white; }
</style>
