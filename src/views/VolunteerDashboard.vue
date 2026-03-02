<template>
  <div class="dashboard">
    <Navbar />
    <div class="layout">
      <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
        <nav>
          <button @click="activeTab = 'myevents'" :class="{ active: activeTab === 'myevents' }">
            <i class="fas fa-calendar-check"></i><span>My Events</span>
          </button>
          <button @click="activeTab = 'browse'" :class="{ active: activeTab === 'browse' }">
            <i class="fas fa-search"></i><span>Browse Events</span>
          </button>
          <button @click="activeTab = 'hours'" :class="{ active: activeTab === 'hours' }">
            <i class="fas fa-medal"></i><span>Hours & Badges</span>
          </button>
          <button @click="activeTab = 'notifications'" :class="{ active: activeTab === 'notifications' }">
            <i class="fas fa-bell"></i><span>Notifications</span>
            <span v-if="notificationCount" class="badge">{{ notificationCount }}</span>
          </button>
          <button @click="toggleCalendar">
            <i class="fas fa-calendar"></i><span>Calendar</span>
          </button>
        </nav>
      </aside>

      <aside class="calendar-sidebar" :class="{ open: calendarOpen }">
        <div class="calendar-header">
          <h3>My Calendar</h3>
          <button @click="calendarOpen = false" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="calendar-controls">
          <button @click="prevMonth"><i class="fas fa-chevron-left"></i></button>
          <span>{{ currentMonth }}</span>
          <button @click="nextMonth"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in calendarDays" :key="day" class="day" :class="{ 'has-event': hasEvent(day) }">
            {{ day }}
          </div>
        </div>
      </aside>

      <main class="content">
        <div v-if="activeTab === 'myevents'">
          <DashboardStats :stats="stats" />
          <MyEvents />
          <RecommendedEvents />
        </div>
        <BrowseEvents v-else-if="activeTab === 'browse'" />
        <HoursBadgesTracker v-else-if="activeTab === 'hours'" />
        <ProfileSettings v-else-if="activeTab === 'profile'" />
        <SettingsPanel v-else-if="activeTab === 'settings'" />
        <NotificationsPanel v-else-if="activeTab === 'notifications'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import DashboardStats from '../components/volunteer/DashboardStats.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import BrowseEvents from '../components/volunteer/BrowseEvents.vue'
import HoursBadgesTracker from '../components/volunteer/HoursBadgesTracker.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'
import SettingsPanel from '../components/common/SettingsPanel.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'
import RecommendedEvents from '../components/volunteer/RecommendedEvents.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('myevents')
const sidebarCollapsed = ref(false)
const calendarOpen = ref(false)
const notificationCount = ref(3)
const currentMonth = ref('October 2024')
const calendarDays = ref(Array.from({ length: 31 }, (_, i) => i + 1))

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

const toggleCalendar = () => {
  calendarOpen.value = !calendarOpen.value
}

const prevMonth = () => {}
const nextMonth = () => {}
const hasEvent = (day) => day === 15 || day === 20
</script>

<style scoped>
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.layout { display: flex; }
.sidebar { width: 250px; background: white; height: calc(100vh - 80px); position: fixed; left: 0; top: 80px; border-right: 1px solid #e5e7eb; padding: 20px 0; }
.sidebar nav { display: flex; flex-direction: column; gap: 5px; }
.sidebar button { display: flex; align-items: center; gap: 12px; padding: 12px 20px; background: none; border: none; width: 100%; text-align: left; cursor: pointer; position: relative; }
.sidebar button:hover { background: var(--light-gray); }
.sidebar button.active { background: #e0f2fe; color: var(--primary); border-right: 3px solid var(--primary); }
.sidebar button i { width: 20px; font-size: 18px; }
.sidebar button .badge { position: absolute; right: 20px; background: #ef4444; color: white; border-radius: 10px; padding: 2px 8px; font-size: 12px; }
.calendar-sidebar { width: 300px; background: white; height: calc(100vh - 80px); position: fixed; right: -300px; top: 80px; border-left: 1px solid #e5e7eb; padding: 20px; transition: right 0.3s; }
.calendar-sidebar.open { right: 0; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.calendar-header h3 { margin: 0; }
.close-btn { background: none; border: none; cursor: pointer; font-size: 18px; }
.calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.calendar-controls button { background: none; border: none; cursor: pointer; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.day { padding: 10px; text-align: center; border-radius: 4px; }
.day.has-event { background: var(--primary); color: white; font-weight: bold; }
.content { margin-left: 250px; padding: 40px; flex: 1; }
</style>
