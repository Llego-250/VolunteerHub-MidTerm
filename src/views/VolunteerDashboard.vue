<template>
  <div class="dashboard">
    <Navbar />
    <div class="layout">
      <DashboardSidebar :items="sidebarItems" :activeTab="activeTab" @navigate="handleNavigate" />

      <main class="content">
        <div v-if="activeTab === 'myevents'" class="main-content">
          <div class="page-header">
            <h1>Volunteer Dashboard</h1>
            <p>Manage your volunteer activities and discover new opportunities</p>
          </div>
          <DashboardStats :stats="stats" />
          <MyEvents />
        </div>
        <BrowseEvents v-else-if="activeTab === 'browse'" />
        <HoursBadgesTracker v-else-if="activeTab === 'hours'" />
        <NotificationsPanel v-else-if="activeTab === 'notifications'" />
        <div v-else-if="activeTab === 'calendar'" class="calendar-view">
          <h2>Calendar View</h2>
          <p>Calendar functionality coming soon...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import DashboardStats from '../components/volunteer/DashboardStats.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import BrowseEvents from '../components/volunteer/BrowseEvents.vue'
import HoursBadgesTracker from '../components/volunteer/HoursBadgesTracker.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('myevents')
const notificationCount = ref(3)

const sidebarItems = computed(() => [
  { id: 'myevents', icon: 'fas fa-calendar-check' },
  { id: 'browse', icon: 'fas fa-search' },
  { id: 'hours', icon: 'fas fa-medal' },
  { id: 'notifications', icon: 'fas fa-bell', badge: notificationCount.value },
  { id: 'calendar', icon: 'fas fa-calendar' }
])

const stats = computed(() => {
  const registered = authStore.currentUser?.registeredEvents?.length || 0
  const upcoming = eventsStore.events.filter(e => 
    e.volunteers.includes(authStore.currentUser?.id) && new Date(e.date) > new Date()
  ).length
  return {
    registered,
    upcoming,
    completed: registered - upcoming
  }
})

const handleNavigate = (tabId) => {
  activeTab.value = tabId
}
</script>

<style scoped>
.dashboard { min-height: 100vh; background: #f3f4f6; padding-top: 80px; }
.layout { display: flex; }
.content { margin-left: 70px; padding: 0; flex: 1; }
.main-content { padding: 40px 60px; }
.page-header { margin-bottom: 40px; text-align: center; }
.page-header h1 { font-size: 42px; margin: 0 0 10px; color: #1f2937; font-weight: 700; }
.page-header p { font-size: 18px; color: #6b7280; margin: 0; }
.calendar-view { padding: 40px 60px; }
</style>
