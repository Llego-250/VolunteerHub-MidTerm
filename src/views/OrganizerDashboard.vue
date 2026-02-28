<template>
  <div class="dashboard">
    <Header />
    <div class="container">
      <div class="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and coordinate with volunteers</p>
        </div>
        <button @click="$router.push('/create-event')" class="btn-create">+ Create New Event</button>
      </div>
      <DashboardStats :stats="stats" />
      <MyEvents />
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
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.dashboard-header h1 { font-size: 32px; margin-bottom: 5px; }
.dashboard-header p { color: var(--gray); }
.btn-create { background: var(--primary); color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
</style>
