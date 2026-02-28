<template>
  <div class="dashboard">
    <Header />
    <h1>Volunteer Dashboard</h1>
    <DashboardStats :stats="stats" />
    <div class="sections">
      <MyEvents />
      <BrowseEvents />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Header from '../components/common/Header.vue'
import DashboardStats from '../components/volunteer/DashboardStats.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import BrowseEvents from '../components/volunteer/BrowseEvents.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

const stats = computed(() => ({
  registered: authStore.currentUser?.registeredEvents?.length || 0,
  hours: 0,
  badges: 0
}))
</script>

<style scoped>
.dashboard { padding: 20px; padding-top: 100px; }
.sections { margin-top: 30px; }
</style>
