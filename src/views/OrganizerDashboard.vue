<template>
  <div class="dashboard">
    <Navbar />
    <DashboardSidebar role="organizer" :activeTab="activeTab" @navigate="handleNavigate" />

    <!-- Calendar Sidebar -->
    <div class="calendar-sidebar" :class="{ open: calendarOpen }">
      <div class="calendar-header">
        <h3>Calendar</h3>
        <button @click="calendarOpen = false" class="close-btn">&times;</button>
      </div>
      <div class="calendar-controls">
        <button @click="prevMonth">&lt;</button>
        <span>{{ currentMonthYear }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar-grid">
        <div class="day-header" v-for="day in ['S','M','T','W','T','F','S']" :key="day">{{ day }}</div>
        <div v-for="date in calendarDates" :key="date.key" class="calendar-day" :class="{ 'other-month': !date.current, 'has-event': date.hasEvent }">
          {{ date.day }}
        </div>
      </div>
    </div>

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
const currentDate = ref(new Date())

const handleNavigate = (id) => {
  if (id === 'calendar') {
    toggleCalendarSidebar()
  } else {
    activeTab.value = id
  }
}

const stats = computed(() => {
  const myEvents = eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
  return {
    events: myEvents.length,
    volunteers: myEvents.reduce((sum, e) => sum + e.volunteers.length, 0),
    active: myEvents.filter(e => new Date(e.date) >= new Date()).length
  }
})

const toggleCalendarSidebar = () => {
  calendarOpen.value = !calendarOpen.value
}

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()
  
  const myEvents = eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
  const eventDates = new Set(myEvents.map(e => new Date(e.date).toDateString()))
  
  const dates = []
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({ day: prevMonthDays - i, current: false, key: `prev-${i}` })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = new Date(year, month, i).toDateString()
    dates.push({ day: i, current: true, hasEvent: eventDates.has(dateStr), key: `curr-${i}` })
  }
  const remaining = 42 - dates.length
  for (let i = 1; i <= remaining; i++) {
    dates.push({ day: i, current: false, key: `next-${i}` })
  }
  return dates
})
</script>

<style scoped>
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }

.calendar-sidebar { position: fixed; left: 1300px; top: 150px; width: 300px; height: calc(70vh - 50px); background: white; border: 1px solid var(--border); border-radius: 30px 0 0 30px; padding: 20px; transform: translateX(-370px); transition: transform 0.3s; z-index: 99; overflow-y: auto; }
.calendar-sidebar.open { transform: translateX(0); }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.calendar-header h3 { margin: 0; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--gray); }
.calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.calendar-controls button { background: none; border: none; cursor: pointer; padding: 5px 10px; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.day-header { text-align: center; font-weight: bold; padding: 5px; font-size: 12px; color: var(--gray); }
.calendar-day { text-align: center; padding: 8px 4px; font-size: 14px; border-radius: 4px; }
.calendar-day.other-month { color: var(--gray); opacity: 0.5; }
.calendar-day.has-event { background: var(--primary); color: white; font-weight: bold; }

.container { margin-left: 70px; max-width: 1400px; padding: 40px 60px; transition: margin-left 0.3s; }
.container.calendar-open { margin-left: 370px; }

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
