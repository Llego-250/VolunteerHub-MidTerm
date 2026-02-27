<template>
  <div class="dashboard">
    <Header />
    <h1>Organizer Dashboard</h1>
    <DashboardStats :stats="stats" />
    <div class="sections">
      <MyEvents />
      <button @click="$router.push('/create-event')">Create Event</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Header from '../components/common/Header.vue'
import DashboardStats from '../components/organizer/DashboardStats.vue'
import MyEvents from '../components/organizer/MyEvents.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

const stats = computed(() => {
  const myEvents = eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
  return {
    events: myEvents.length,
    volunteers: myEvents.reduce((sum, e) => sum + e.volunteers.length, 0),
    active: myEvents.filter(e => !e.status).length
  }
})
</script>

<style scoped>
.dashboard { padding: 20px; }
.sections { margin-top: 30px; }
button { padding: 10px 20px; margin-top: 20px; }
</style>
