<template>
  <div class="dashboard">
    <Navbar />
    <DashboardSidebar role="organizer" :activeTab="activeTab" @navigate="handleNavigate" />

    <CalendarSidebar :isOpen="calendarOpen" :events="myEvents" @close="calendarOpen = false" />

    <div class="container" :class="{ 'calendar-open': calendarOpen }">
      <div class="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and coordinate with volunteers</p>
        </div>
        <button v-if="activeTab === 'overview'" @click="activeTab = 'create'" class="btn-primary">Create New Event</button>
      </div>

      <div v-if="activeTab === 'overview'">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ stats.events }}</h3>
            <p>Total Events</p>
          </div>
          <div class="stat-card">
            <h3>{{ stats.volunteers }}</h3>
            <p>Total Volunteers</p>
          </div>
          <div class="stat-card">
            <h3>{{ stats.active }}</h3>
            <p>Active Events</p>
          </div>
        </div>
        <MyEvents @switchTab="activeTab = $event" />
      </div>
      <CreateEventForm v-else-if="activeTab === 'create'" @created="activeTab = 'overview'" />
      <ManageEventsPanel v-else-if="activeTab === 'manage'" />
      <MessageVolunteersPanel v-else-if="activeTab === 'message'" />
      <div v-else-if="activeTab === 'profile'" class="profile-section">
        <button @click="activeTab = 'overview'" class="btn-back">← Back to Dashboard</button>
        <ProfileSettings />
      </div>
      <SettingsPanel v-else-if="activeTab === 'settings'" />
      <NotificationsPanel v-else-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import CalendarSidebar from '../components/common/CalendarSidebar.vue'
import MyEvents from '../components/organizer/MyEvents.vue'
import CreateEventForm from '../components/organizer/CreateEventForm.vue'
import ManageEventsPanel from '../components/organizer/ManageEventsPanel.vue'
import MessageVolunteersPanel from '../components/organizer/MessageVolunteersPanel.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'
import SettingsPanel from '../components/common/SettingsPanel.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('overview')
const calendarOpen = ref(false)

const myEvents = computed(() => eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id))

const handleNavigate = (id) => {
  if (id === 'calendar') {
    toggleCalendarSidebar()
  } else {
    activeTab.value = id
  }
}

const stats = computed(() => {
  return {
    events: myEvents.value.length,
    volunteers: myEvents.value.reduce((sum, e) => sum + e.volunteers.length, 0),
    active: myEvents.value.filter(e => new Date(e.date) >= new Date()).length
  }
})

const toggleCalendarSidebar = () => {
  calendarOpen.value = !calendarOpen.value
}
</script>

<style scoped>
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }

.container { margin-left: 70px; max-width: 1400px; padding: 40px 60px; transition: margin-right 0.3s; }
.container.calendar-open { margin-right: 300px; }

.dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
.dashboard-header h1 { font-size: 32px; margin-bottom: 5px; }
.dashboard-header p { color: var(--gray); margin-bottom: 0; }
.btn-primary { padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-primary:hover { background: var(--primary-dark); }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
.stat-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.stat-card h3 { font-size: 36px; margin: 0 0 8px 0; color: var(--primary); }
.stat-card p { margin: 0; color: var(--gray); font-size: 14px; }

.profile-section { background: white; padding: 30px; border-radius: 12px; }
.btn-back { padding: 10px 20px; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 20px; }
.btn-back:hover { background: var(--light-gray); }
</style>
